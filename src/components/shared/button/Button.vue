<template>
    <button @click="disparaAcao()" class="btn btn" :class="estiloDoBotao" :type="type">{{ tags }}</button>
</template>

<script>

export default {

    props: {

        type: {
            required: true, 
            type: String
        },

        tags: {
            required: true, 
            type: String
        }, 

        check: Boolean,
        styles: String

    },

    methods: {

        disparaAcao() {

            if(this.check) {
                if(confirm('Confirma operação?')) {
                    this.$emit('botaoAtivado');
                }
                return;
            }
            this.$emit('botaoAtivado');
        }
    },

    computed: {

        estiloDoBotao() {

            if(this.styles == 'default' || !this.styles) return 'btn-success';
            if(this.styles == 'danger') return 'btn-danger';
        }

    }
}
</script>

<style>
    .botao {
        display: inline-block;
        padding: 10px;
        border-radius: 3px;
        margin: 10px;
        font-size: 1.2em;
    }
</style>