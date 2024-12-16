import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';

import * as ticketService from "./api/services/ticket"
import { Ticket } from './api/services/ticket';
import { formatDate } from './utils/date';

describe('App Component', () => {

  it('should fetch and display tickets on load', async () => {
    const tickets: Ticket[] = [{
      client: "John Doe",
      issue: "Cannot access my account",
      status: "open",
      deadline: "2024-12-15T15:19:14.980Z",
    }];
    jest.spyOn(ticketService, "getTicketsRequest").mockResolvedValueOnce(tickets)

    render(<ThemeProvider theme={theme}><App /></ThemeProvider>)

    expect(await screen.findByText(tickets[0].client.toUpperCase())).toBeInTheDocument()
    expect(await screen.findByText(tickets[0].issue)).toBeInTheDocument()
    expect(await screen.findByText(formatDate(tickets[0].deadline))).toBeInTheDocument()
  });

  it('should add a ticket when create ticket is pressed', async () => {
    const tickets: Ticket[] = [{
      client: "John Doe",
      issue: "Cannot access my account",
      status: "open",
      deadline: "2024-12-15T15:19:14.980Z",
    }];
    jest.spyOn(ticketService, "addTicketRequest").mockResolvedValueOnce(tickets[0])

    render(<ThemeProvider theme={theme}><App /></ThemeProvider>)

    const button = screen.getByText('Create new');
    fireEvent.click(button);

    expect(await screen.findByText(tickets[0].client.toUpperCase())).toBeInTheDocument()
    expect(await screen.findByText(tickets[0].issue)).toBeInTheDocument()
    expect(await screen.findByText(formatDate(tickets[0].deadline))).toBeInTheDocument()
  });

  it('should update a ticket status when switch is toggled', async () => {
    const tickets: Ticket[] = [{
      client: "John Doe",
      issue: "Cannot access my account",
      status: "open",
      deadline: "2024-12-15T15:19:14.980Z",
    }];
    jest.spyOn(ticketService, "getTicketsRequest").mockResolvedValueOnce(tickets)
    const updateTicketSpy = jest.spyOn(ticketService, "updateTicketRequest").mockResolvedValueOnce({...tickets[0], status: "closed", client: "Carlos"})

    render(<ThemeProvider theme={theme}><App /></ThemeProvider>)

    expect(await screen.findByText(tickets[0].client.toUpperCase())).toBeInTheDocument()
    expect(await screen.findByText(tickets[0].issue)).toBeInTheDocument()
    expect(await screen.findByText(formatDate(tickets[0].deadline))).toBeInTheDocument()

    const switchButton = (await screen.findByRole("checkbox"))
    fireEvent.click(switchButton)

    expect(updateTicketSpy).toHaveBeenCalled()
  });
});
