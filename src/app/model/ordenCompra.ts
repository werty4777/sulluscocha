export interface OrdenCompra {


    numeroComprobante;
    proveedor: DetallesProveedor;
    detalles: DetallesOrden[];
    fechaEntrega;
    direccionEntrega;
    monedas;
    condicionPago;
    formaPago;
    observaciones;


}

export interface DetallesProveedor {

    ruc;
    nombre;
    correo;
    telefono;
    direccion;
}

export interface DetallesOrden {


    tipo;
    color;
    marca;
    modelo;
    descripcion;
    talla;
    unidadMedida;
    precioUnitario;
    descuento;
    cantidad;


}
