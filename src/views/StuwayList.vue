<template>
    <div class="container">
        <el-table :data="tableData" style="width: 100%" height="90vh">
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
        <el-pagination background layout="prev, pager, next" :page-size="15" :total="total" @current-change="page"></el-pagination>

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
        name: "StuwayList",
        data() {
            return {
                total: null,
                tableData: null,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
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
        created() {
            let _this = this
            axios.get('http://localhost:8081/stuway/findByPage/1/15').then(res => {
                _this.tableData = res.data.content
                _this.total = res.data.totalElements
                console.log(res)
            })
        },
        methods: {
            handleEdit(index, row) {
                this.dialogFormVisible = true
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
                    }).catch(e => {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    })
                    window.location.reload()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            page (currentPage) {
                let _this = this
                axios.get('http://localhost:8081/stuway/findByPage/' + currentPage + '/15').then(res => {
                    _this.tableData = res.data.content
                })
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
                                window.location.reload()
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

</style>