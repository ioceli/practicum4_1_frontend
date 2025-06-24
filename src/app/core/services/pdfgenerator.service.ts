import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { message } from 'src/app/global/util/menssages';

@Injectable({
    providedIn: 'root',
})
export class PdfGeneratorService {

    msg = message;
    private preprocessedImages: { [key: string]: string } = {};

    constructor() {
        (pdfMake as any).vfs = pdfFonts as any;
    }

    async prepararImagenes() {
        const imageUrl = 'assets/img/general/orden_de_pago_CERS.png'; // Reemplaza con la URL de tu imagen
        const imageBase64 = await this.getImageDataUrl(imageUrl);
        this.preprocessedImages['mi-imagen'] = imageBase64;
        // Repite el proceso para otras imágenes si es necesario
    }

    async generarPdf(parametros: any) {
        await this.prepararImagenes();
        const documentDefinition: TDocumentDefinitions = {
            content: [
                {
                    table: {
                        widths: ['*'], // El ancho de la celda será el ancho de la página
                        body: [
                            [
                                {
                                    text: this.msg.GENERAR_ORDEN_PAGO_PDF + " " + parametros.numeroOrden,
                                    // style: 'header',
                                    fillColor: '#CACACA', // Color del fondo
                                    color: '#000000', // Color del texto
                                    border: [false, false, false, false],
                                    margin: [10, 0, 10, 0], // Margen inferior para separar el encabezado del contenido
                                    alignment: 'center',
                                    fontSize: 18,
                                },
                            ],
                            [
                                {
                                    text: parametros.subtitulo, // Agrega el subtitulo aquí
                                    style: 'subheader',
                                    alignment: 'center', // Centrar el subtitulo
                                    border: [false, false, false, false],
                                    margin: [0, 20, 0, 20],
                                    fontSize: 12,
                                },
                            ],
                        ],
                    },
                },
                {
                    table: {
                        widths: ['*', '*', '*', '*'],
                        body: [
                            [{ text: this.msg.DATOS_ORDEN, border: [false, false, false, false],fontSize: 11, bold: true}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}],
                            [{ text: this.msg.FECHA_EMISION, border: [false, false, false, false], fontSize: 9, bold: true}, {text: parametros.fechaEmision, border: [false, false, false, false], fontSize: 9}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}],
                            [{ text: this.msg.NRO_SOLICITUD, border: [false, false, false, false], fontSize: 9, bold: true}, {text: parametros.nroSolicitud, border: [false, false, false, false], fontSize: 9}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}],
                            [{ text:this.msg.VALOR_A_PAGAR, border: [false, false, false, false], fontSize: 9, bold: true}, {text: "$ " + parametros.totalPagar, border: [false, false, false, false], fontSize: 9}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}],
                            // [{ text: this.msg.FECHA_MAXIMA_PAGO, border: [false, false, false, false], fontSize: 9}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}]
                        ],
                    },
                },
                { text: '\n' },
                {
                    table: {
                        widths: ['*','*','*','*'],
                        body: [
                            [{ text: this.msg.DATOS_DEL_PETICIONARIO, border: [false, false, false, false], fontSize: 11, bold: true}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}],
                            [{ text: this.msg.NOMBRE, border: [false, false, false, false], fontSize: 9, bold: true}, {text: parametros.nombre, border: [false, false, false, false], fontSize: 9}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}],
                            [{ text: this.msg.lbl_identificacion + ": ", border: [false, false, false, false], fontSize: 9, bold: true}, {text: parametros.identificaion, border: [false, false, false, false], fontSize: 9}, {text: '', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}],
                        ]
                    }
                },
                { text: '\n\n\n\n\n' },
                {
                    image: this.preprocessedImages['mi-imagen'],
                    width: 550, // Ajustar el ancho de la imagen
                    height: 400, // Ajustar la altura de la imagen
                    alignment: 'center', // Centrar la imagen
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    fillColor: '#CACACA',
                    alignment: 'center', // Centrar el texto
                    color: 'black', // Color del texto
                    margin: [0, 10, 0, 0], // Margen inferior para separar el encabezado del contenido
                },
                cellStyle: {
                    bold: true,
                   // border: undefined
                },
            },
        };

        pdfMake.createPdf(documentDefinition).open();
    }

    async getImageDataUrl(imageUrl: string): Promise<string> {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(blob);
        });
      }
}
