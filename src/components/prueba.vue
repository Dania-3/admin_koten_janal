<template>
    <!--darle una variable que podamos usar en otro archivo<H2>{{ msg.texto}}</H2>-->
    <div v-bind:style="msg.style">
        <h2 id="texto">{{ msg.texto}}</h2>
    </div>
</template>


<script>
export default {
    name: "prueba",
    props:{
        msg:{
            /*type: String, //incluir el mensaje en string*/
            type: Object, //al usar object se usara style
            required: true,
        }
    }
    /*props:["msg"]*/
}
</script>
<style scoped>
#texto{
    margin: 12px;
}
</style>