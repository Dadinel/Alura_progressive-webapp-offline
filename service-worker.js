let versao = 1;

self.addEventListener("activate", function() {
    let arquivos = [
        "/",
        "css/estilos.css",
        "css/opcoesDaPagina.css",
        "css/opcoesDoCartao.css",
        "css/cabecalho.css",
        "css/login.css",
        "css/loginForm.css",
        "css/loginStatus.css",
        "css/cartao.css",
        "css/novoCartao.css",
        "css/mural.css",
        "js/lib/jquery.js",
        "js/lib/eventemitter2.js",
        "js/lib/KeyBoardNavigation.js",
        "js/tags/Tags.js",
        "js/cabecalho/mudaLayout.js",
        "js/cabecalho/busca.js",
        "js/filtro/Filtro.js",
        "js/tipos/TiposCartao.js",
        "js/cartao/render/Cartao_renderHelpers.js",
        "js/cartao/render/CartaoOpcoes_render.js",
        "js/cartao/render/CartaoConteudo_render.js",
        "js/cartao/render/Cartao_render.js",
        "js/cartao/Cartao.js",
        "js/mural/render/Mural_render.js",
        "js/login/LoginUsuario_render.js",
        "js/login/LoginUsuario.js",
        "js/mural/Mural.js",
        "js/cabecalho/novoCartao.js",
        "img/bin.svg",
        "img/bin2.svg",
        "img/close.svg",
        "img/edit.svg",
        "img/palette.svg",
        "img/appicon.png",
        "js/sw/registra.js",
        "service-worker.js",
        "app.manifest",
        "favicon.ico" ];

    caches.open("ceep-arquivos-"+versao)
    .then(cache => {
        cache.addAll(arquivos);

        for(let i = versao-1; i >= 0; i--) {
            caches.delete("ceep-arquivos-"+i);
        }
    });
});

self.addEventListener("fetch", function(event) {
    let pedido = event.request;

    let promiseResposta = caches.match(pedido)
        .then(respostaCache => {
            let resposta = respostaCache ? respostaCache : fetch(pedido);
            return resposta;
        });

    event.respondWith(promiseResposta);
});