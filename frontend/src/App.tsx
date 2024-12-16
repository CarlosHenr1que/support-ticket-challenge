import { useEffect, useState } from 'react';

import { TicketCard } from './components/TicketCard';
import { addTicketRequest, donwloadTicketsReportRequest, getTicketsRequest, Ticket, updateTicketRequest } from './api/services/ticket';
import { generateTwoRandomTickets, sortTicketsByDeadline } from './utils/ticket';
import { startDonwloadOnPage } from './utils/file';
import { Box, Button, Typography } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isCreateRandomPressed, setIsCreateRandomPressed] = useState(false)

  const handleGetTicketsRequest = async () => {
    const tickets = await getTicketsRequest()
    if (tickets) {
      setTickets(tickets)
    }
  }

  const onCreateRandomlyClick = async () => {
    if(isCreateRandomPressed) {
      return
    }
    setTimeout(() => {setIsCreateRandomPressed(false)}, 1000)
    setIsCreateRandomPressed(true)
    const ticketPromises = generateTwoRandomTickets().map((item) => addTicketRequest(item as Ticket));
    const response = await Promise.all(ticketPromises);
    let newTickets: Ticket[] = []
    response.forEach(i => i && newTickets.push(i));
    setTickets(previous => sortTicketsByDeadline([...previous, ...newTickets]))
  };

  const onCreateNewTicketClick = async () => {
    const ticket = await addTicketRequest(generateTwoRandomTickets()[0] as Ticket)
    if (ticket) {
      const newTickets = sortTicketsByDeadline([...tickets, ticket]);
      setTickets(newTickets)
    }
  };

  const onGenerateReportClick = async () => {
    const blob = await donwloadTicketsReportRequest()
    if (blob) {
      startDonwloadOnPage(blob, 'tickets_report.xlsx')
    }
  };

  const onChangeStatusClick = async (ticket: Ticket) => {
    const currentTickets = [...tickets]
    const updatedTicket: Ticket = { ...ticket, status: ticket.status === "open" ? "closed" : "open" }
    setTickets(previous => previous.map(i => i.id === ticket.id ? updatedTicket : i))
    const result = await updateTicketRequest(updatedTicket)
    if (!result) {
      setTickets(currentTickets)
    }
  }

  useEffect(() => {
    handleGetTicketsRequest()
  }, [])

  return (
    <Box bgcolor="#FAFAFA" component="main" display="flex" flexDirection="column" p={2} minHeight="100vh" maxHeight="100vh">
      <Box display="flex" flexDirection="column" p={2} flex={1} maxHeight="100vh" sx={{
        border: '2px solid #bcbcbc',
      }} borderRadius={2} >
        <Box component="header" display="flex" alignItems="center">
          <Box border="3px solid #9DC7EE" alignItems="center" justifyContent="center" p={1} mr={4} borderRadius={2}>
            <img
              src="/task-list-icon.svg"
              alt="task list icon"
              width={28}
            />
          </Box>
          <Typography fontWeight="bold">Timeline</Typography>
        </Box>
        <Box flex={1} height="100%" py={2} overflow="auto" >
          {tickets.map((i, index) => (
            <Box mb={1} key={i.id}>
              <TicketCard position={index + 1} ticket={i} onSwitch={() => onChangeStatusClick(i)} />
            </Box>
          ))}
        </Box>
        <Box component="footer" width="100%" display="flex" justifyContent="flex-end" gap={2}>
          <Button variant='contained' onClick={onGenerateReportClick} endIcon={<ChevronRight />}>Generate report</Button>
          <Button variant='contained' onClick={onCreateRandomlyClick} endIcon={<ChevronRight />}>Create Ramdomly</Button>
          <Button variant='contained' onClick={onCreateNewTicketClick} endIcon={<ChevronRight />}>Create new</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
