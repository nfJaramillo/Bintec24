import { useEffect, useState, useContext } from "react";
import { getAllCars, buyCar, getRole, getFunds, registerCar } from "../utils/interact.jsx";
import { Grid, Stack, Typography, Box, Button, Card, CardActionArea, CardContent, CardActions, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { AppContext } from '../App.jsx';
import { useAccount } from 'wagmi'

const Tickets = () => {


    const { address } = useAccount()
    const [data, setData] = useState([]);
    const [role, setRole] = useState([]);
    const [funds, setFunds] = useState([]);
    const [time, setTime] = useState(Date.now());
    var contextData = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [carDetails, setCarDetails] = useState({
        quality: '',
        price: '',
        title: '',
        description: ' '
    });

    // Abrir el popup
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Cerrar el popup
    const handleClose = () => {
        setOpen(false);
    };

    // Manejar el cambio en los campos del formulario
    const handleChange = (e) => {
        setCarDetails({
            ...carDetails,
            [e.target.name]: e.target.value
        });
    };


    useEffect(() => {

        const fetchData = async () => {

            const status = await getAllCars();
            const temp = await JSON.parse(status);
            setData(temp)
            const role = await getRole(address)
            setRole(role)
            const funds = await getFunds(address)
            setFunds(funds)

        };

        const interval = setInterval(() => setTime(Date.now()), 10000);
        fetchData()
        return () => {
            clearInterval(interval);
        };
    }, [time]);


    const handleSubmit = async () => {
        if (address !== undefined && address.length > 1) {

            const { severity, status } = await registerCar(address, carDetails);
            contextData.severity(severity)
            contextData.text(status);
            contextData.show(true)

        }
        else {
            contextData.severity("warning")
            contextData.text("Conecta tu billeteta");
            contextData.show(true)
        }
        handleClose();
    };


    const handlepurchase = async (id, alvailability) => {
        if (address !== undefined && address.length > 1) {
            if (alvailability) {
                const { severity, status } = await buyCar(address, id);
                contextData.severity(severity)
                contextData.text(status);
                contextData.show(true)
            }
            else {
                contextData.severity("warning")
                contextData.text("Este carro ya no esta disponible");
                contextData.show(true)
            }

        }
        else {
            contextData.severity("warning")
            contextData.text("Conecta tu billeteta");
            contextData.show(true)
        }

    };

    return (
        <Grid
            container
            justifyContent="center"
            maxWidth={{ xs: '100%', sm: '100%', md: 'xl' }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#cfe8fc',
                minHeight: '80vh',
                borderRadius: 1,
                mt: 3,
                background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)',
                p: { xs: 2, sm: 3, md: 5 }
            }}
        >
            <Stack spacing={2} width={{ xs: '100%', sm: '90vw', md: '80vw' }} justifyContent="center" alignItems="center">

                {/* Título del mercado */}
                <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h4', md: 'h3' } }}>
                    Mercado
                </Typography>

                {/* Bloque estilizado para mostrar rol, fondos y botón */}
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        bgcolor: '#f0f4f7',
                        p: { xs: 2, md: 3 },
                        borderRadius: 2,
                        boxShadow: 3,
                        width: { xs: '100%', md: '80%' },
                        mt: 2
                    }}
                >
                    <Typography variant="h6" sx={{ mr: { md: 3 }, mb: { xs: 1, md: 0 } }}>
                        Rol:
                        <Typography display="inline" fontWeight="bold" sx={{ color: '#1976d2', ml: 1 }}>
                            {role === 'Seller' ? 'Vendedor' : role === 'Buyer' ? 'Comprador' : 'Invitado'}
                        </Typography>
                    </Typography>

                    <Typography variant="h6" sx={{ mr: { md: 3 }, mb: { xs: 1, md: 0 } }}>
                        Fondos:
                        <Typography display="inline" fontWeight="bold" sx={{ color: '#388e3c', ml: 1 }}>
                            {funds}
                        </Typography>
                    </Typography>

                    {role === 'Seller' && (
                        <>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#388e3c',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    boxShadow: 3,
                                    mt: { xs: 2, md: 0 }
                                }}
                                onClick={handleClickOpen}
                            >
                                Vender
                            </Button>

                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Vender Vehículo</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        select
                                        fullWidth
                                        margin="dense"
                                        label="Calidad"
                                        name="quality"
                                        value={carDetails.quality}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>Baja (1)</MenuItem>
                                        <MenuItem value={2}>Media (2)</MenuItem>
                                        <MenuItem value={3}>Alta (3)</MenuItem>
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        label="Precio"
                                        name="price"
                                        type="number"
                                        value={carDetails.price}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        label="Título"
                                        name="title"
                                        value={carDetails.title}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        label="Descripción"
                                        name="description"
                                        value={carDetails.description}
                                        onChange={handleChange}
                                        multiline
                                        rows={3}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} sx={{ color: 'orange' }}>Cancelar</Button>
                                    <Button onClick={handleSubmit} sx={{ color: 'green' }}>Vender</Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}
                </Box>

                {/* Mostrar las tarjetas de vehículos */}
                <Box display="flex" justifyContent="center" alignItems="center" mt={3} width="100%">
                    <Grid
                        container
                        rowSpacing={3}
                        maxWidth="xl"
                        justifyContent="center"
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {data?.filter(car => car.isAvailable).map((cars) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={cars['id']} display="flex" justifyContent="center">
                                <Card sx={{ maxWidth: { xs: '100%', sm: 225 }, height: '100%', textAlign: 'center' }}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {cars['title']}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" align="justify">
                                                {cars['description']}
                                            </Typography>
                                            <br />
                                            <Typography display='inline' fontWeight='bold'>Vendedor: </Typography>
                                            <Typography display='inline' variant="body2" color="text.secondary" align="justify">
                                                {`${cars['owner'].slice(0, 6)}...${cars['owner'].slice(-4)}`}
                                            </Typography>
                                            <br />
                                            <Typography display='inline' fontWeight='bold'>Precio: </Typography>
                                            <Typography display='inline' variant="body2" color="text.secondary" align="justify">
                                                {cars['price']}
                                            </Typography>
                                            <br />
                                            <Typography display='inline' fontWeight='bold'>Disponible: </Typography>
                                            <Typography display='inline' variant="body2" color="text.secondary" align="justify">
                                                {cars['isAvailable'].toString()}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    {role === 'Buyer' && (
                                        <CardActions sx={{ justifyContent: "center" }}>
                                            <Button size="small" sx={{ backgroundColor: '#00c587' }} variant="contained" onClick={() => handlepurchase(cars['id'], cars['isAvailable'])}>
                                                Comprar
                                            </Button>
                                        </CardActions>
                                    )}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Stack>
        </Grid>
    );
};

export default Tickets;
