import { createContext } from 'react';

const LoggerContext = createContext(console.error);

export default LoggerContext;
