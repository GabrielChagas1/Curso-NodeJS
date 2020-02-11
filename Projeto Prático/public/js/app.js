$(document).ready(() =>{
    // iniciando o plugin dropify
    $('.dropify').dropify({
        messages: {
            'default': 'Arraste e solte um arquivo ou clique aqui',
            'replace': 'Arraste e solte ou clique para substituir',
            'remove':  'Remover',
            'error':   'Ooops, something wrong happended.'
        }
    });
});