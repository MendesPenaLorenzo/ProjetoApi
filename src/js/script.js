// DESCLARAÇÕES DOS ELEMENTOS COM DOM

const videoElemento=document.getElementById("video");
const botScanear=document.getElementById("btn-texto");
const resultado=document.getElementById("saida");
const canvas=document.getElementById("canvas");

// FUNÇÃO PARA HABILITAR A CAMERA

async function configurarCamera(){
    try{
        const midia = await navigator.mediaDevices.getUserMedia({
            video:{ facingMode: "environmente"}, // HABILITANDO A CAMERA TRASEIRA
            audio:false //O AUDIO NÃO VAI SER CAPTADO
        })
    
        // ATRIBUIR O FLUXO DA CAMERA EM MIDIA
        videoElemento.srcObject = midia;
        // GARANTE QUE A CAMERA VAI FUNCIONAR
        videoElemento.play();
    }catch(erro){
        resultado.innerTexto="Erro ao capturar a câmera", erro;
    }
}

// EXECUTA A FUNÇÃO DA CAMERA

configurarCamera();

// FUNÇÃO PARA CAPTURAR O TEXTO

botaoScanear.onclick = async ()=>{
    botaoScanear.disabled = true; // HABILITA O BOTAO DE PEGAR O TEXTO
    resultado.innerText = "Fazendo a leitura... Aguarde";

    // PREPARA O CANVAS PRA RECEBER ESTRUTURA 2D
    const contexto = canvas.getContext("2d");

    canvas.width = videoElemento.videoWidth;
    canvas.height = videoElemento.videoHeight;

    // DEFINE A MATRIZ DE TRANSFORMAÇÃO DO CANVAS (ESCALA, INCLINAÇÃO)

    contexto.setTransform(1, 0, 0, 1, 0, 0);

    // APLICA FILTRO DE CONTRASTE PARA MELHORAR O OCR
    contexto.filter = 'contrast(1, 2) grayscale(1)';

    contexto.drawImage(videoElemento, 0, 0, canvas.width,canvas.height);

    try{
        // O TESSERACT RETORNA O OBJETO
        const {data: {text}} = await Tesseract.recognize(
            canvas,
            "por" //DEFINE O IDIOMA
        );
        const textFinal = text.trim();
        resultado.innerText = textoFinal.length > 0 ?textoFinal : "Não foi possível identificar o texto";
    }catch(erro){
        resultado.innerText = "Erro ao processar a leitura", erro
    }finally{
        // DESABILITA A LEITURA DO TEXTO PARA COMEÇAR NOVAMENTE
        botaoScanear.Scanear.disabled=false;
    }
} 