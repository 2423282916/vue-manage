<template>
    <el-container style="height:100%">
        <el-aside width="auto">
            <commonAside></commonAside>
        </el-aside>
        <el-container>
            <el-header>
                <commonHeader></commonHeader>
            </el-header>
                <commonTag></commonTag>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import commonTag from "@/components/commonTag.vue";
import commonAside from "../src/components/commonAside.vue"
import commonHeader from "../src/components/commonHeader.vue"
export default {
    name: "Main",
    data() {
        return {};
    },
    components: { commonAside, commonHeader, commonTag }
}
</script>
<style lang="less" scoped>
.el-header {
    background-color: #333;
}

.el-main {
    padding-top: 0px;
}
</style>