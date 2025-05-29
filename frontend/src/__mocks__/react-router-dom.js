// src/__mocks__/react-router-dom.js
import React from "react";

export const MemoryRouter = ({ children }) => children;
export const useLocation = () => ({ pathname: "/" });
export const Link = ({ to, children }) => <a href={to}>{children}</a>;
