"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './transaction-history.css';

interface Transaction {
    orderId: string;
    type: string;
    amount: string;
    date: string;
    paymentMethod: string;
    status: 'Pending' | 'Successful';
}

const TransactionHistoryPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sampleData: Transaction[] = [
            { orderId: "#123", type: "Social Media Expert", amount: "$99.00", date: "Dec 15, 2024", paymentMethod: "Paypal", status: "Pending" },
            { orderId: "#456", type: "Web Designer", amount: "$199.00", date: "Nov 10, 2024", paymentMethod: "Bank Transfer", status: "Pending" },
            { orderId: "#789", type: "Finance Accountant", amount: "$299.00", date: "Oct 5, 2024", paymentMethod: "Paypal", status: "Pending" },
            { orderId: "#101", type: "Social Media Expert", amount: "$399.00", date: "Dec 15, 2024", paymentMethod: "Bank Transfer", status: "Successful" },
            { orderId: "#112", type: "Web Designer", amount: "$499.00", date: "Nov 10, 2024", paymentMethod: "Paypal", status: "Pending" },
            { orderId: "#987", type: "Finance Accountant", amount: "$599.00", date: "Oct 5, 2024", paymentMethod: "Bank Transfer", status: "Successful" },
            { orderId: "#654", type: "Social Media Expert", amount: "$699.00", date: "Dec 15, 2024", paymentMethod: "Paypal", status: "Successful" },
            { orderId: "#321", type: "Web Designer", amount: "$799.00", date: "Nov 10, 2024", paymentMethod: "Bank Transfer", status: "Successful" },
            { orderId: "#569", type: "Finance Accountant", amount: "$899.00", date: "Oct 5, 2024", paymentMethod: "Paypal", status: "Pending" },
        ];
        setTransactions(sampleData);
        setLoading(false);
    }, []);

    return (
        <>
            <div className="dashboard-headline">
                <h3>TRANSACTION HISTORY</h3>
            </div>

            <div className="row">
                <div className="col-xl-12">
                    {loading ? (
                        <p>Yüklənir...</p>
                    ) : (
                        <table className="transaction-history-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Payment Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction.orderId}>
                                        <td><span className="order-id">{transaction.orderId}</span></td>
                                        <td>{transaction.type}</td>
                                        <td><span className="amount">{transaction.amount}</span></td>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.paymentMethod}</td>
                                        <td>
                                            <span className={`status ${transaction.status.toLowerCase()}`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default TransactionHistoryPage;