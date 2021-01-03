<template>
    <div class="container">
        <div class="main">
            <el-form :model="searchForm" :rules="rules" ref="searchForm" class="demo-ruleForm">
                <el-form-item label="学号" prop="stuid" :label-width="formLabelWidth">
                    <el-col :span="12">
                        <el-input v-model="searchForm.stuid" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="年度" prop="year" :label-width="formLabelWidth">
                    <el-col :span="12">
                        <el-input v-model.number="searchForm.year" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="search('searchForm')">查 询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-if="showAnswer" :data="tableData" style="width: 100%" height="40vh">
            <el-table-column prop="stuid" label="学号" width="180"></el-table-column>
            <el-table-column prop="year" label="学年" width="180"></el-table-column>
            <el-table-column prop="sex" label="性别" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
<!--        <el-pagination v-if="showAnswer" background layout="prev, pager, next" :page-size="8" :total="total" @current-change="page"></el-pagination>-->

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" >
                <el-form-item label="学号" prop="stuid" :label-width="formLabelWidth">
                    <el-input v-model="form.stuid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年度" prop="year" :label-width="formLabelWidth">
                    <el-input v-model.number="form.year" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
                    <el-select v-model="form.sex" placeholder="请选择学生性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="毕业去向" prop="way" :label-width="formLabelWidth">
                    <el-select v-model="form.way" placeholder="请选择毕业去向">
                        <el-option label="升学" value="升学"></el-option>
                        <el-option label="灵活就业" value="灵活就业"></el-option>
                        <el-option label="签约就业" value="签约就业"></el-option>
                        <el-option label="非派遣/劳动合同" value="非派遣/劳动合同"></el-option>
                        <el-option label="未就业" value="未就业"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="实际单位" prop="company" :label-width="formLabelWidth">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="单位所在地" prop="address" :label-width="formLabelWidth">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="单位隶属" prop="province" :label-width="formLabelWidth">
                    <el-input v-model="form.province"></el-input>
                </el-form-item>
                <el-form-item label="单位性质" prop="type" :label-width="formLabelWidth">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="单位类型" prop="kind" :label-width="formLabelWidth">
                    <el-input v-model="form.kind"></el-input>
                </el-form-item>
                <el-form-item label="行业性质" prop="field" :label-width="formLabelWidth">
                    <el-input v-model="form.field"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data () {
            return {
                showAnswer: false,
                dialogFormVisible: false,
                tableData: null,
                searchForm: {
                    stuid: '',
                    year: null,
                },
                formLabelWidth: '120px',
                form: {
                    id: null,
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
                total: null,
                rules: {
                    year: [
                        { type: 'number', message: '请输入数字', trigger: 'change'},
                        { required: true, message: '请输入毕业年度'  }
                    ],
                    stuid: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请选择学生性别', trigger: 'blur' }
                    ],
                    way: [
                        { required: true, message: '请至少选择一个毕业去向', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            search (formName) {
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.get("http://localhost:8081/stuway/findByYearandId/" + this.searchForm.year +"/" +this.searchForm.stuid).then(res => {
                            console.log(res)
                            _this.tableData = res.data
                            _this.$notify({
                                title: '成功',
                                message: '查询成功',
                                type: 'success',
                                showClose: false
                            });
                            _this.showAnswer = true
                            _this.total = res.data.totalElements
                        })
                    }
                });
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true
                this.form.id = row.id
                this.form.stuid = row.stuid
                this.form.year = row.year
                this.form.sex = row.sex
                this.form.way = row.way
                this.form.company = row.company
                this.form.address = row.address
                this.form.type = row.type
                this.form.kind = row.kind
                this.form.field = row.field
            },
            handleDelete(index, row) {
                let _this = this
                this.$confirm('是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete("http://localhost:8081/stuway/deleteByid/" + row.id).then(res => {
                        console.log(res)
                        if (res.status === 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                        axios.get("http://localhost:8081/stuway/findByYearandId/" + _this.searchForm.year +"/" +_this.searchForm.stuid).then(res => {
                            console.log(res)
                            _this.tableData = res.data
                        })
                    }).catch(e => {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            submit (formName) {
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否确定修改?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            axios.put("http://localhost:8081/stuway/update",this.form).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                _this.dialogFormVisible = false
                                // window.location.reload()
                                // _this.search('searchForm')
                                axios.get("http://localhost:8081/stuway/findByYearandId/" + _this.searchForm.year +"/" +_this.searchForm.stuid).then(res => {
                                    console.log(res)
                                    _this.tableData = res.data
                                })
                            }).catch(e => {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败!'
                                });
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改'
                            });
                        });

                    }
                });
            }
        }
    }
</script>

<style scoped>
    /*.container {*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*}*/
    .main {
        width: 45%;
        margin: 0 auto;
        /*text-align: center;*/
    }
    .btn {
        margin-left: 120px;
    }
</style>