import {Nostock} from './noStockCompraRequerimiento';

export interface NoStockTrasladoRequerimiento {
    idAlmacenEntrega: number;
    fechaEmision: string;
    fechaEntrega: string;
    condicionRequerimiento: string;
    detallesRequerimiento: Nostock[];
    observaciones: string;
}

