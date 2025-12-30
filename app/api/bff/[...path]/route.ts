import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPSTREAM = "https://api.busy.az";

type RouteParams = { path: string[] };

export async function GET(req: NextRequest, ctx: { params: Promise<RouteParams> }) {
  const { path: pathArr } = await ctx.params;
  const path = pathArr?.join("/") || "";
  const upstreamUrl = new URL(`${UPSTREAM}/${path}`);
  upstreamUrl.search = req.nextUrl.search;

  const upstreamRes = await fetch(upstreamUrl.toString(), {
    cache: "no-store",
    headers: {
      // ƏN VACİBİ: upstream-dən sıxılmış (gzip/br) yox, plain cavab istə
      "accept-encoding": "identity",
      "accept": req.headers.get("accept") ?? "application/json,*/*",
      "accept-language": req.headers.get("accept-language") ?? "",
      // Auth header-i (Bearer token) upstream-ə ötür (məs: /api/me)
      ...(req.headers.get("authorization") ? { authorization: req.headers.get("authorization") as string } : {}),
    },
  });

  // Body-ni text kimi oxu (dekompress mismatch problemi burada bitir)
  const bodyText = await upstreamRes.text();

  const headers = new Headers();
  headers.set("content-type", upstreamRes.headers.get("content-type") ?? "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");

  return new Response(bodyText, {
    status: upstreamRes.status,
    headers,
  });
}

async function proxyWithBody(
  req: NextRequest,
  ctx: { params: Promise<RouteParams> },
  method: "POST" | "PUT" | "PATCH" | "DELETE"
) {
  const { path: pathArr } = await ctx.params;
  const path = pathArr?.join("/") || "";
  const upstreamUrl = new URL(`${UPSTREAM}/${path}`);
  upstreamUrl.search = req.nextUrl.search;

  const contentType = req.headers.get("content-type") ?? "application/json";
  const bodyText = await req.text();

  const upstreamRes = await fetch(upstreamUrl.toString(), {
    method,
    cache: "no-store",
    headers: {
      "accept-encoding": "identity",
      "accept": req.headers.get("accept") ?? "application/json,*/*",
      "accept-language": req.headers.get("accept-language") ?? "",
      "content-type": contentType,
      ...(req.headers.get("authorization") ? { authorization: req.headers.get("authorization") as string } : {}),
      // CSRF header placeholder (backend tələb etsə)
      ...(req.headers.get("x-csrf-token") ? { "x-csrf-token": req.headers.get("x-csrf-token") as string } : {}),
    },
    body: bodyText,
  });

  const upstreamBodyText = await upstreamRes.text();

  const headers = new Headers();
  headers.set("content-type", upstreamRes.headers.get("content-type") ?? "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");

  return new Response(upstreamBodyText, {
    status: upstreamRes.status,
    headers,
  });
}

export async function POST(req: NextRequest, ctx: { params: Promise<RouteParams> }) {
  return proxyWithBody(req, ctx, "POST");
}

export async function PUT(req: NextRequest, ctx: { params: Promise<RouteParams> }) {
  return proxyWithBody(req, ctx, "PUT");
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<RouteParams> }) {
  return proxyWithBody(req, ctx, "PATCH");
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<RouteParams> }) {
  return proxyWithBody(req, ctx, "DELETE");
}
