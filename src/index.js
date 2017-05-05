import Message from './Message.vue';

export default {
    install (Vue, name = '$message') {

        function construct(options) {
            let instance = new Vue.extend(Message);
            instance.vm = instance.$mount();
            for(let key in options) {
                instance.vm[key] = options[key];
            }
            document.querySelector('body').appendChild(instance.vm.$el);
            instance.vm.visible = true;
            return instance;
        }

        let o = {
            show (msg, options = {}) {
                let instance = construct(options);
                instance.vm.msg = msg;
            },
            error (retcode = 0, retmsg = 'ok', options = {}) {
                let instance = construct(options);
                instance.vm.msg = `[${retcode}]${retmsg}`;
            }
        }

        Object.defineProperty(Vue.prototype, name, {value: o});
    }
}