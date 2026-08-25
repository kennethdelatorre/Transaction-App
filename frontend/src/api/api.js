import axios from "axios";

const api = axios.create({
  baseURL: "/api/transactions",
});

export const createTransaction = (data) => api.post("/", data);
export const getTransactions = (params) => api.get("/", { params });
export const getTransactionById = (id) => api.get(`/${id}`);
export const updateTransaction = (id, data) => api.put(`/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/${id}`);
