// app.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}

interface HistoryItem {
  title: string;
  messages: ChatMessage[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-container dark-mode">
      <aside class="sidebar" [class.collapsed]="sidebarCollapsed">
        <button class="toggle-btn" (click)="toggleSidebar()">☰</button>
        <div class="history" *ngIf="!sidebarCollapsed">
          <h3>Chat History</h3>
          <button class="new-chat-btn" (click)="createNewChat()">+ New Chat</button>
          <ul>
            <li *ngFor="let item of history; let i = index">
              <span (click)="loadFromHistory(item)">{{ item.title }}</span>
              <button class="delete-btn" (click)="deleteChat(i)">🗑️</button>
            </li>
          </ul>
        </div>
      </aside>
      <main class="chat-wrapper">
        <header class="chat-header">
          <h1>Chat Interface</h1>
        </header>

        <section class="chat-box" #chatHistory>
          <div *ngFor="let msg of chatMessages" [ngClass]="msg.sender" class="chat-message">
            <div class="bubble">
              <span class="sender">{{ msg.sender === 'user' ? 'You' : 'AI' }}</span>
              <p>{{ msg.message }}</p>
              <small>{{ msg.timestamp }}</small>
            </div>
          </div>
          <div *ngIf="loading" class="chat-message bot">
            <div class="bubble typing">AI is typing...</div>
          </div>
        </section>

        <footer class="chat-input">
          <input [(ngModel)]="userInput" (keydown.enter)="sendMessage()" [disabled]="loading" placeholder="Ask something..." />
          <button (click)="sendMessage()" [disabled]="loading">Send</button>
        </footer>
      </main>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      position: fixed; /* prevents external scroll */
    }
    .app-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    background: #121212;
    color: #f1f1f1;
    overflow: hidden;
    }
    .sidebar {
      width: 250px;
      background: #1e1e1e;
      padding: 16px;
      border-right: 1px solid #333;
      transition: width 0.3s;
    }
    .sidebar.collapsed {
      width: 50px;
    }
    .toggle-btn {
      background: transparent;
      color: #f1f1f1;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }
    .history ul {
      list-style: none;
      margin-top: 20px;
    }
    .history li {
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .history li:hover {
      background: #333;
    }
    .delete-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: #f1f1f1;
    }
    .delete-btn:hover {
      color: #ff5555;
    }
    .new-chat-btn {
      display: block;
      margin-bottom: 10px;
      padding: 8px;
      border: none;
      border-radius: 4px;
      background: #6366f1;
      color: white;
      cursor: pointer;
      font-weight: 600;
    }
    .new-chat-btn:hover {
      background: #555;
    }
    .chat-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0; /* ensures internal scroll works */
    overflow: hidden;
    }
    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #333;
      color: white;
    }
    .chat-box {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #1e1e1e;
    min-height: 0;
    }
    .chat-message {
      display: flex;
      max-width: 70%;
    }
    .chat-message.user {
      align-self: flex-end;
      justify-content: flex-end;
    }
    .chat-message.bot {
      align-self: flex-start;
    }
    .bubble {
      background: #333;
      padding: 10px 16px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .chat-message.user .bubble {
      background: #6366f1;
      color: white;
    }
    .chat-message.bot .bubble {
      background: #444;
      color: #f1f1f1;
    }
    .bubble .sender {
      font-weight: bold;
      display: block;
      margin-bottom: 4px;
    }
    .bubble small {
      display: block;
      margin-top: 6px;
      font-size: 0.75rem;
      opacity: 0.6;
    }
    .bubble.typing {
      font-style: italic;
      background: #555;
      animation: blink 1s infinite alternate;
    }
    @keyframes blink {
      0% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    .chat-input {
      display: flex;
      padding: 16px;
      background: #1e1e1e;
      border-top: 1px solid #333;
    }
    .chat-input input {
      flex: 1;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #555;
      font-size: 1rem;
      outline: none;
      background: #333;
      color: #f1f1f1;
    }
    .chat-input button {
      margin-left: 10px;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      background: #6366f1;
      color: white;
      cursor: pointer;
      font-weight: 600;
    }
    .chat-input button:disabled {
      background: #555;
      cursor: not-allowed;
    }
  `]
})
export class AppComponent {
  chatMessages: ChatMessage[] = [];
  history: HistoryItem[] = [];
  userInput = '';
  loading = false;
  sidebarCollapsed = true;

  @ViewChild('chatHistory') private chatHistoryRef!: ElementRef;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  async sendMessage() {
    const trimmedInput = this.userInput.trim();
    if (!trimmedInput || this.loading) return;

    const timestamp = new Date().toLocaleTimeString();
    const userMessage: ChatMessage = { sender: 'user', message: trimmedInput, timestamp };
    this.chatMessages.push(userMessage);
    this.scrollToBottom();

    this.loading = true;
    this.userInput = '';

    try {
      const formData = new FormData();
      formData.append('user_query', trimmedInput);

      const response = await fetch('http://localhost:8000/process_query/', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      const botResponse = data.error
        ? `Error: ${data.error}`
        : JSON.stringify(data.result);

      this.chatMessages.push({ sender: 'bot', message: botResponse, timestamp: new Date().toLocaleTimeString() });
      this.saveToHistory();
    } catch (error) {
      this.chatMessages.push({ sender: 'bot', message: 'Network error.', timestamp: new Date().toLocaleTimeString() });
    }

    this.loading = false;
    this.scrollToBottom();
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatHistoryRef) {
        this.chatHistoryRef.nativeElement.scrollTop = this.chatHistoryRef.nativeElement.scrollHeight;
      }
    }, 100);
  }

  private saveToHistory() {
    const title = this.chatMessages.find(m => m.sender === 'user')?.message.slice(0, 30) || 'New Chat';
    this.history.push({ title, messages: [...this.chatMessages] });
  }

  loadFromHistory(item: HistoryItem) {
    this.chatMessages = [...item.messages];
    this.scrollToBottom();
  }

  createNewChat() {
    this.chatMessages = [];
    this.scrollToBottom();
  }

  deleteChat(index: number) {
    this.history.splice(index, 1);
  }
}