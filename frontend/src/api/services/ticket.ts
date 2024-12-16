export const URL = "http://localhost:3000"

export interface Ticket {
    id?: string
    client: string
    issue: string
    status: 'open' | 'closed'
    deadline: string
    createdAt?: string
    updatedAt?: string
}

export const addTicketRequest = async (params: Ticket): Promise<Ticket | undefined> => {
    try {
        const response = await fetch(`${URL}/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        });
        if (!response.ok) {
            throw new Error()
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export const getTicketsRequest = async (): Promise<Ticket[] | undefined> => {
    try {
        const response = await fetch(`${URL}/tickets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error()
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export const updateTicketRequest = async (params: Ticket): Promise<Ticket | undefined> => {
    try {
        const response = await fetch(`${URL}/tickets/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        });
        if (!response.ok) {
            throw new Error()
        }
        return params
    } catch (error) {
        console.log(error)
    }
}

export const donwloadTicketsReportRequest = async () => {
    try {
        const response = await fetch(`${URL}/report`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error()
        }
        return await response.blob();
    } catch (error) {
        console.log(error)
    }
}