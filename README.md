# 🪙 Finora – Modern Crypto Trading Platform

**Finora** is a secure cryptocurrency trading platform that allows users to **track, trade, and manage digital assets** in real-time with wallet support, live trading, and secure transactions.

---


## 📸 Screenshots

### 🏠 Home / Dashboard
<p align="center">
  <img src="./assets/home1.png" width="800"/>
</p>

---

### 💹 Trading Page
<p align="center">
  <img src="./assets/trade.png" width="800"/>
</p>

---

### 📋 Sidebar Navigation
<p align="center">
  <img src="./assets/sidebar.png" width="300"/>
</p>

---

### 🏦 Bank / Payment Details
<p align="center">
  <img src="./assets/bank.png" width="600"/>
</p>

---

### 🔄 Transfer Funds
<p align="center">
  <img src="./assets/transfer.png" width="600"/>
</p>

---
## 🚀 Features

- 📊 Live crypto price tracking  
- 📈 Interactive charts (ApexCharts)  
- 💼 Portfolio & wallet management  
- ⚡ Instant buy/sell trading  
- 💳 Deposit & withdrawal system  
- 🔍 Search and filter coins  
- 🎨 Modern UI (Shadcn + Tailwind)  
- 🔐 Secure backend (Spring Boot + JWT)  

---

## ⚙️ Architecture & Messaging

### 🔄 Apache Kafka (Event Streaming)

Kafka is used to **decouple services** and handle asynchronous operations:

- 💳 Payment processing decoupling  
- 🔄 Transaction updates via events  
- 📧 Email notification service (alerts, confirmations)  

---

### ⚡ Redis (Caching & Performance)

Redis is used for **fast data access and caching**:

- 🏦 Bank account details caching  
- 💰 Transaction amount handling  
- 👤 User data caching  

---

## 🛠 Tech Stack

**Frontend:** React, JavaScript, TailwindCSS, Shadcn UI  
**Backend:** Spring Boot, Spring Security, JWT  
**Database:** PostgreSQL / MySQL  
**Messaging:** Apache Kafka  
**Caching:** Redis  
**Charts:** ApexCharts  
**APIs:** CoinGecko, Alpha Vantage  

---



