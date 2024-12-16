import { Ticket } from "../api/services/ticket";
import { generateDateWithOffset } from "./date";

export const generateRandomClient = () => {
  const clients = ["John Doe", "Jane Smith", "Alice Brown", "Bob White", "Charlie Green"];
  return clients[Math.floor(Math.random() * clients.length)];
};

export const generateRandomIssue = () => {
  const issues = [
    "Cannot access my account",
    "App crashes on launch",
    "Login error",
    "Page not loading",
    "Payment issue"
  ];
  return issues[Math.floor(Math.random() * issues.length)];
};

export const generateTwoRandomTickets = () => {
  const pastDeadlineTicket = {
    client: generateRandomClient(),
    issue: generateRandomIssue(),
    status: "open",
    deadline: generateDateWithOffset(-2),
  }

  const futureDeadlineTicket = {
    client: generateRandomClient(),
    issue: generateRandomIssue(),
    status: "open",
    deadline: generateDateWithOffset(2),
  }
  return [pastDeadlineTicket, futureDeadlineTicket]
}

export const sortTicketsByDeadline = (tickets: Ticket[]) => tickets.sort((a, b) => {
  const dateA = new Date(a.deadline);
  const dateB = new Date(b.deadline);

  return dateB.getTime() - dateA.getTime();
})