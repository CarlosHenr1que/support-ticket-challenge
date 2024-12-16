import { Box, Switch, TextField, Typography } from "@mui/material"
import { Ticket } from "../../api/services/ticket"
import { formatDate } from "../../utils/date"

interface Props {
    position: number;
    ticket: Ticket;
    onSwitch: () => void;
}

export const TicketCard = ({ position, ticket, onSwitch }: Props) => {
    const getStatusIcon = (status: string, deadline: string) => {
        const today = new Date();
        const dueDate = new Date(deadline);

        if (status === "closed") {
            return "/status-green.svg";
        } else if (dueDate > today) {
            return "/status-yellow.svg";
        } else {
            return "/status-red.svg";
        }
    };
    return (
        <Box component="article" bgcolor="#CEE2F6" borderRadius={2} p={2}  sx={{ width: { sm: "100%", md: "40%" } }} aria-labelledby={`ticket-${position}`} >
            <Box sx={{
                flexDirection: {
                    xs: 'column',
                    md: 'row',
                },
            }} display="flex" justifyContent="space-between" mb={1}>
                <Box display="flex" gap={2}>
                    <Typography>{position}.</Typography>
                    <Typography fontWeight="bold">{ticket.client.toUpperCase()}</Typography>
                </Box>

                <Box display="flex">
                    <Typography fontWeight="bold">{formatDate(ticket.deadline)}</Typography>
                </Box>

                <Box display="flex">
                    <Switch onChange={onSwitch} checked={ticket.status === "closed"} />
                    <img src={getStatusIcon(ticket.status, ticket.deadline)} alt="status" />
                </Box>
            </Box>
            <TextField
                value={ticket.issue}
                label=""
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                disabled
                sx={{ backgroundColor: '#fff' }}
            />
        </Box>
    )
}