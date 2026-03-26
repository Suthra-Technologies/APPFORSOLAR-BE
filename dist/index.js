"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
(0, server_1.buildServer)().then(({ httpServer }) => {
    httpServer.listen(PORT, () => {
        console.log(`🚀 Solar Server ready at http://localhost:${PORT}`);
        console.log(`🔌 GraphQL ready at http://localhost:${PORT}/graphql`);
    });
}).catch(console.error);
