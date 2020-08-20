<template>
    <div>
    
        <el-breadcrumb separator-class="el-icon-arrow-right">
    
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    
            <el-breadcrumb-item :to="{ path: '/specs' }">规格列表</el-breadcrumb-item>
    
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    
        </el-breadcrumb>
    
    
    
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    
            <el-form-item label="规格名称" prop="specsname" class="inp">
    
                <el-input v-model="ruleForm.specsname"></el-input>
    
            </el-form-item>
    
            <el-form-item label="规格属性" prop="" ref="newSpecs">
    
                <el-input v-model="ruleForm.attrs"></el-input>
    
                <el-button type="primary" @click="addAttrs">新增规格属性</el-button>
    
            </el-form-item>
    
            <el-form-item class="newSpecs" v-for="(attr, index) in ruleForm.attrs" :label="'规格属性' + index" :key="attr.key" :prop="'attrs.' + index + '.value'" :rules="{
    
          required: true, message: '属性不能为空', trigger: 'blur'
    
        }">
    
                <el-input v-model="attr.value"></el-input>
    
                <el-button @click.prevent="removeAttrs(attr)" type="primary">删除</el-button>
    
            </el-form-item>
    
            <el-form-item label="状态" prop="status">
    
                <el-switch v-model="ruleForm.status"></el-switch>
    
            </el-form-item>
    
            <el-button type="primary">确定</el-button>
    
    
    
        </el-form>
    
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            list: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },

            title: "",
            specList: [],
            ruleForm: {
                specsname: "",
                attrs: [{
                    value: ''
                }],
                status: false,
            },
            id: "",
            rules: {
                specsname: [{
                    required: true,
                    message: '请输入规格名称',
                    trigger: 'blur'
                }, ]
            }
        };
    },
    mounted() {
        this.id = this.$route.params.id;


        if (this.id) {
            this.title = "规格编辑"
            // 根据id获取某一条菜单
            this.$http.get("/specsinfo", {
                id: this.id
            }).then(res => {
                console.log(res)
                let {
                    status
                } = res.data.list
                this.ruleForm = { ...res.data.list,
                    status: status == 1 ? true : false,

                }
            })
        } else {
            this.title = "规格添加"
        }
        // 调用菜单列表接口，在下拉框中使用

    },
    methods: {
        addAttrs() {
            this.ruleForm.attrs.push({
                value: '',
                key: Date.now()
            });
        },
        removeAttrs(item) {
            var index = this.ruleForm.attrs.indexOf(item)
            if (index !== -1) {
                this.ruleForm.attrs.splice(index, 1)
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2;
                    if (!this.id) {
                        this.$http.post("/specsadd", this.ruleForm).then(res => {
                            this.$router.push('/specs')
                        })
                    } else {
                        this.$http.post("/specsedit", { ...this.ruleForm,
                            id: this.id
                        }).then(res => {
                            this.$router.push('/specs')
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.inp .el-input {
    width: 480px
}

.el-input {
    width: 350px;
}

.newSpecs .el-button {
    color: #fff;
    background-color: #F56C6B;
    border-color: #F56C6B;
}
</style>

