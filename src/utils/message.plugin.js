export default {
    install: (app, optons) => {
        app.config.globalProperties.$message = function(html) {
            M.toast({html})
        }
        app.config.globalProperties.$error = function(html) {
            M.toast({html: `[Ошибка]: ${html}`})
        }
    }
}