<template>
    <div>
         <el-form-item label="规格属性" prop="attrs" v-for="(item,index) in list" :key="index">
        <el-input v-model="item.attrs"  class="inp3"></el-input>
        <el-button type="primary" >删除</el-button>
      </el-form-item>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>