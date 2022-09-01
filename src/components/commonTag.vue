<template>
    <div class="tabs">
        <el-tag v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name !== 'home'"
            :effect="$route.name === tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)"
            @close="handleClose(tag, index)" size="small">
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
    name: 'commonTag',
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    },
    methods: {
        // 取到tab.js中的colseTag
        ...mapMutations({
            close:'closeTag'
        }),
        // tab切换
        changeMenu(item) {
            // 跳转到item中
            this.$router.push({ name: item.name })
        },
        // 删除tab
        handleClose(tag, index) {
            // tags的长度
            const length = this.tags.length - 1;
            this.close(tag)
            // 如果删除的不是当前拥有焦点的tab,直接删除即可，不用切换tab
            if (tag.name !== this.$route.name) {
                return;
            }
            // 如果当前tab是位于最后的一个tab,删除后焦点向前移动一位
            if (index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                // 焦点向后移动一位
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tabs {
    padding: 20px;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>