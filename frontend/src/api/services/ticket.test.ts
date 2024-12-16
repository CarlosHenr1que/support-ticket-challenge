import { addTicketRequest, Ticket, URL } from './ticket';
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
});
