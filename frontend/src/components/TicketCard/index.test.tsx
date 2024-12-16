import { fireEvent, render, screen } from '@testing-library/react';
import { TicketCard } from './index';
import { Ticket } from '../../api/services/ticket';
import React from 'react';
import { formatDate } from '../../utils/date';

const mockTicket: Ticket = {
    client: 'Client A',
    issue: 'Issue description',
    status: 'open',
    deadline: '2024-12-31',
};

const mockOnSwitch = jest.fn();

describe('TicketCard', () => {
    it('should render ticket information correctly', () => {
        render(<TicketCard position={1} ticket={mockTicket} onSwitch={mockOnSwitch} />);

        expect(screen.getByText(mockTicket.client.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(formatDate(mockTicket.deadline))).toBeInTheDocument();
        expect(screen.getByText(mockTicket.issue)).toBeInTheDocument();
    });
    it('should call onSwitch when switch is toggled', () => {
        render(<TicketCard position={1} ticket={mockTicket} onSwitch={mockOnSwitch} />);

        const switchElement = screen.getByRole('checkbox');
        fireEvent.click(switchElement);
        expect(mockOnSwitch).toHaveBeenCalled();
    });

    it('should display the correct status icon based on ticket status', () => {
        render(<TicketCard position={1} ticket={{ ...mockTicket, status: 'closed' }} onSwitch={mockOnSwitch} />);
        const statusImage = screen.getByAltText('status');
        expect((statusImage as any).src).toContain('/status-green.svg');
    });
});
