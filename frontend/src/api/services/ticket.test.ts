import { addTicketRequest, getTicketsRequest, Ticket, updateTicketRequest, URL } from './ticket';
global.fetch = jest.fn();

describe('API Requests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should make a POST request to add a ticket', async () => {
        const mockTicket: Ticket = {
            client: 'Client A',
            issue: 'Issue description',
            status: 'open',
            deadline: '2024-12-31',
        };

        const mockResponse = { ...mockTicket, id: '123' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await addTicketRequest(mockTicket);

        expect(fetch).toHaveBeenCalledWith(`${URL}/tickets`, expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(mockTicket),
        }));
        expect(result).toEqual(mockResponse);
    });

    it('should return undefined if addTicketRequest fails', async () => {
        const mockTicket: Ticket = {
            client: 'Client A',
            issue: 'Issue description',
            status: 'open',
            deadline: '2024-12-31',
        };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const result = await addTicketRequest(mockTicket);

        expect(result).toBeUndefined();
    });

    it('should make a GET request to get tickets', async () => {
        const mockTickets: Ticket[] = [
            { client: 'Client A', issue: 'Issue description', status: 'open', deadline: '2024-12-31' },
        ];
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockTickets,
        });

        const result = await getTicketsRequest();

        expect(fetch).toHaveBeenCalledWith(`${URL}/tickets`, expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
                'Content-Type': 'application/json',
            }),
        }));
        expect(result).toEqual(mockTickets);
    });

    it('should return undefined if getTicketsRequest fails', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const result = await getTicketsRequest();

        expect(result).toBeUndefined();
    });

    it('should make a PUT request to update a ticket', async () => {
        const mockTicket: Ticket = {
            id: '123',
            client: 'Client A',
            issue: 'Issue description',
            status: 'open',
            deadline: '2024-12-31',
        };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockTicket,
        });

        const result = await updateTicketRequest(mockTicket);

        expect(fetch).toHaveBeenCalledWith(`${URL}/tickets/${mockTicket.id}`, expect.objectContaining({
            method: 'PUT',
            headers: expect.objectContaining({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(mockTicket),
        }));
        expect(result).toEqual(mockTicket);
    });

    it('should return undefined if updateTicketRequest fails', async () => {
        const mockTicket: Ticket = {
            id: '123',
            client: 'Client A',
            issue: 'Issue description',
            status: 'open',
            deadline: '2024-12-31',
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const result = await updateTicketRequest(mockTicket);

        expect(result).toBeUndefined();
    });
});
