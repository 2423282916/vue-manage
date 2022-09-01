<template>
    <div class="manage">
        <!-- 新增用户/修改用户弹窗 -->
        <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
            <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+新增</el-button>
            <common-form :formLabel="formLabel" :form="searchForm" :inline="true" ref="form">
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </common-form>
        </div>
        <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()"
            @edit="editUser" @del="delUser">

        </common-table>
    </div>
</template>
<script>
import commonForm from '@/components/commonForm.vue';
import commonTable from '@/components/commonTable.vue';
import { getUser } from '../../api/data'
export default {
    name: "user",
    components: {
        commonForm,
        commonTable
    },
    data() {
        return {
            operateType: 'add',
            isShow: false,
            operateFormLabel: [
                {
                    model: 'name',
                    label: '姓名',
                    type: 'input'
                },
                {
                    model: 'age',
                    label: '年龄',
                    type: 'input'
                },
                {
                    model: 'sex',
                    label: '性别',
                    type: 'select',
                    opts: [
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 0
                        }
                    ]
                },
                {
                    model: 'birth',
                    label: '出生日期',
                    type: 'date'
                },
                {
                    model: 'addr',
                    label: '地址',
                    type: 'input'
                }
            ],
            operateForm: {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            },
            formLabel: [
                {
                    model: 'keyword',
                    label: '',
                    type: 'input'
                }
            ],
            searchForm: {
                keyword: '',
            },
            tableData: [],
            tableLabel: [
                {
                    prop: "name",
                    label: "姓名"
                },
                {
                    prop: "age",
                    label: "年龄"
                },
                {
                    prop: "sexLabel",
                    label: "性别"
                },
                {
                    prop: "birth",
                    label: "出生日期",
                    width: 200
                },
                {
                    prop: "addr",
                    label: "地址",
                    width: 320
                },
            ],
            config: {
                page: 1,
                total: 30
            }
        }
    },
    methods: {
        confirm() {
            if (this.operateType === 'edit') {
                this.$http.post('/user/edit', this.operateForm).then(res => {
                    console.log(res);
                    this.isShow = false;
                    //编辑用户后将列表重置更新
                    this.getList()
                })
            } else {
                this.$http.post('/user/add', this.operateForm).then(res => {
                    console.log(res);
                    this.isShow = false;
                    //新增用户后将列表重置更新
                    this.getList()
                })
            }
        },
        addUser() {
            this.isShow = true
            this.operateType = 'add'
            // 初始化内容，例如关闭弹窗再打开后，原本填写的内容将清空
            this.operateForm = {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            }
        },
        editUser(row) {
            this.operateType = 'edit'
            this.isShow = true
            //将当前行的数据会写到operateForm（弹窗）中
            this.operateForm = row
        },
        delUser(row) {
            this.$confirm("此操作将永久删除该记录，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                const id = row.id
                this.$http.get("user/del", {
                    params: { id }
                }).then(() => {
                    this.$message({
                        type: "success",
                        message: '删除成功'
                    })
                    this.getList()
                })
            })
        },
        getList(name = '') {
            this.config.loading = true
            name ? (this.config.page = 1) : ''
            getUser({
                page: this.config.page,
                name
            }).then(({ data: res }) => {
                this.tableData = res.list.map(item => {
                    item.sexLabel = item.sex === 0 ? "女" : "男"
                    return item
                })
                this.config.total = res.count
                this.config.loading = false
            })
        }
    },
    created() {
        this.getList()
    },
}
</script>

<style lang="less" scoped>
.manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>