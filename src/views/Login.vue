<template>
    <div class="login-wrap">
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="account">
                    <el-input v-model="ruleForm.account" placeholder="用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" />
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p v-show="accountError" style="font-size:12px;line-height:30px;color:#FF0000;">用户名或密码错误。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                accountError: false,
                ruleForm: {
                    account: "",
                    password: ""
                },
                rules: {
                    account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
                }
            };
        },
        methods: {
            submitForm (formName) {
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.get("http://localhost:8081/Login/"+_this.ruleForm.account + "/" + this.ruleForm.password).then(res => {
                            if(res.data.length!==0){
                                _this.$router.push('/Home')
                                console.log(res)
                            } else {
                                _this.accountError = true
                            }
                        })
                    }
                })
            }
        }
    };
</script>

<style scoped>
    .login-wrap {
        position: absolute;
        background: #409eff;
        height: 100%;
        width: 100%;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
    .union-id-check{
        cursor: pointer;
        padding: 10px 0;
        text-align: center;
        font-size: 14px;
    }
</style>
