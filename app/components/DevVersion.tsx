import packageJson from '../../package.json';

const DevVersion = () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const versions = {
    node: typeof process !== 'undefined' ? process.version : 'N/A',
    next: packageJson.dependencies.next,
    react: packageJson.dependencies.react,
  };

  const styles: React.CSSProperties = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    padding: '5px 10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontSize: '12px',
    borderRadius: '5px',
    zIndex: 9999,
    fontFamily: 'monospace',
  };

  return (
    <div style={styles}>
      <span>Node: {versions.node} | </span>
      <span>Next: v{versions.next} | </span>
      <span>React: v{versions.react}</span>
    </div>
  );
};

export default DevVersion;