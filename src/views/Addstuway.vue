<template>
    <div class="container">
        <div class="main">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="学号" prop="stuid">
                    <el-col :span="8">
                        <el-input v-model="ruleForm.stuid"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="年度" prop="year">
                    <el-col :span="8">
                        <el-input v-model.number="ruleForm.year"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleForm.sex" placeholder="请选择学生性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="毕业去向" prop="way">
                    <el-select v-model="ruleForm.way" placeholder="请选择毕业去向">
                        <el-option label="升学" value="升学"></el-option>
                        <el-option label="灵活就业" value="灵活就业"></el-option>
                        <el-option label="签约就业" value="签约就业"></el-option>
                        <el-option label="非派遣/劳动合同" value="非派遣/劳动合同"></el-option>
                        <el-option label="未就业" value="未就业"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="实际单位" prop="company">
                    <el-col :span="8">
                        <el-input v-model="ruleForm.company"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="单位所在地" prop="address">
                    <el-col :span="8">
                        <el-input v-model="ruleForm.address"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="单位隶属" prop="province">
                    <el-col :span="8">
                        <el-input v-model="ruleForm.province"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="单位性质" prop="type">
                    <el-col :span="8">
                        <el-input v-model="ruleForm.type"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="单位类型" prop="kind">
                    <el-col :span="8">
                        <el-input v-model="ruleForm.kind"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="行业性质" prop="field">
                    <el-col :span="8">
                        <el-input v-model="ruleForm.field"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    year: null,
                    stuid: '',
                    sex: '',
                    way: '',
                    company: '',
                    address: '',
                    province: '',
                    type: '',
                    kind: '',
                    field: ''
                },
                rules: {
                    year: [
                        { required: true, message: '请输入毕业年度' },
                        { type: 'number', message: '请输入数字' }
                    ],
                    stuid: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请选择学生性别', trigger: 'blur' }
                    ],
                    way: [
                        { required: true, message: '请至少选择一个毕业去向', trigger: 'change' }
                    ],
                    company: [
                        {  }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post("http://localhost:8081/stuway/add",this.ruleForm).then(res => {
                            console.log(res)
                            _this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success',
                                showClose: false
                            });
                        })
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
    /*.main {*/
    /*    !*width: 60%;*!*/
    /*    !*margin: 0 auto;*!*/
    /*    !*text-align: center;*!*/
    /*    display: flex;*/
    /*    flex-wrap: wrap;*/
    /*    justify-content: center;*/
    /*}*/
</style>