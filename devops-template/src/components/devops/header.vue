<template>
    <div>
        <div class="platform-header">
            <div class="platform-header-left" v-if="headerType">
                <div class="header-select">
                    <bk-select v-model="active"
                        popover-width="240"
                        ext-popover-cls="platform-extension"
                        ext-cls="select-custom"
                        @selected="handleSelect"
                        :clearable="false"
                        searchable>
                        <bk-option v-for="option in dashboardList"
                            :key="option.id"
                            :id="option.id"
                            :name="option.name"
                            :disabled="optionDisabled(option.canOperate, option.isSystem)">
                            <div class="extension-item">
                                <div class="item-select-name" :class="{ 'item-select-show-all': !(!option.isDefault && !defaultLoading) }">
                                    <icon style="margin-right: 8px;flex-shrink: 0;" :name="option.isSystem ? 'platform-default' : 'platform-edit'" width="12" height="12"></icon>
                                    <span class="select-name-span" :title="option.name">{{ option.name }}</span>
                                </div>
                                <span v-if="option.isDefault && !defaultLoading" class="default-name">默认</span>
                                <span v-if="!option.isDefault && !defaultLoading" @click.stop.prevent="handlerDefault(option)" class="item-select-default">设为默认</span>
                            </div>
                        </bk-option>
                        <div slot="extension" @click="toCreatDashboard" class="extension-item">
                            <icon style="margin-right: 8px;" name="platform-add" width="12" height="12"></icon>
                            新建工作台
                        </div>
                        <div slot="extension" @click="toDashboardList" class="extension-item">
                            <icon style="margin-right: 8px;" name="platform-list" width="12" height="12"></icon>
                            全部工作台
                        </div>
                    </bk-select>
                </div>
                <div class="header-status">{{ infoStatus }}</div>
            </div>
            <div class="platform-header-slot-left" v-else>
                <slot name="left">
                </slot>
            </div>
            <div class="platform-header-slot-right">
                <slot name="right">
                </slot>
            </div>
        </div>
        <createPlatform :create-dialog="createDialog" @getDataList="getDataList"></createPlatform>
    </div>
    
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import { getDashboard, defaultDashboard } from '@/api/platform'
    import createPlatform from '../createPlatform'
    export default {
        components: {
            createPlatform
        },
        props: {
            headerType: {
                type: Boolean,
                default: true
            },
            selected: {
                type: Function
            },
            isEdit: {
                type: Boolean
            }
        },
        data () {
            return {
                createDialog: {
                    title: '创建工作台',
                    visible: false,
                    type: 'add'
                },
                map: {
                    'all': '全部',
                    'TENANT': '全员可见',
                    'MYSELF': '仅自己可见',
                    'MEMBER': '指定成员可见',
                    'SYSTEM': '全员可见'
                },
                defaultLoading: false
            }
        },
        computed: {
            ...mapState('platform', ['dashboardList', 'currentDashboard']),
            ...mapState(['userAdminType']),
            infoStatus () {
                const val = this.currentDashboard?.dashboardShare?.scope
                return this.map[val]
            },
            active () {
                return this.currentDashboard?.id
            },
            isAdmin () {
                return this.userAdminType === 'ADMIN'
            }
        },
        methods: {
            ...mapMutations('platform', ['UPDATE_STATE_KEY_VALUE']),
            getDataList () {
                this.defaultLoading = true
                getDashboard().finally(() => {
                    this.defaultLoading = false
                })
            },
            changeRoute (data) {
                this.$emit('update:active', data)
            },
            toCreatDashboard () {
                this.createDialog = {
                    title: '新增工作台',
                    visible: true,
                    type: 'add'
                }
            },
            toDashboardList () {
                this.$router.push({
                    name: 'platformList'
                })
            },
            handleSelect (val, option) {
                if (this.selected) this.selected(val, option)
                else this.selectedDashboard(val, option)
            },
            // 选择工作台
            selectedDashboard (val, option) {
                const params = this.dashboardList.find(item => item.id === val)
                this.UPDATE_STATE_KEY_VALUE({
                    key: 'currentDashboard',
                    value: params
                })
            },
            optionDisabled (canOperate, isSystem) {
                if (isSystem) return this.isEdit && !this.isAdmin
                return this.isEdit && !canOperate
            },
            handlerDefault (option) {
                if (this.defaultLoading) return
                defaultDashboard({ dashboardId: option.id }).then(res => {
                    if (res) {
                        this.$bkMessage({
                            theme: 'success',
                            message: '设为默认成功'
                        })
                        this.selectedDashboard(option.id)
                        this.getDataList()
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/conf.scss';
    .platform-header {
        display: flex;
        height: 50px;
        background-color: #fff;
        align-items: center;
        padding: 0 10px;
        margin: 0 10px 10px;
        justify-content: space-between;
        &-left {
            display: flex;
            align-items: center;
            .header-status {
                color: #3A84FF;
                background-color: #3A84FF1A;
                border-radius: 2px;
                height: 18px;
                margin-left: 14px;
                padding: 0 4px;
            }
        }
        &-right {
        }
        &-slot-left {
            font-size: 14px;
            font-weight: 600;
            color: #081E40;
            padding-left: 10px;
        }
    }
    .top-go-platform {
        cursor: pointer;
    }
    .select-custom {
        border: none;
        box-shadow: none;
        min-width: 70px;
    }
    .platform-extension {
        .extension-item {
            .item-select-name {
                display: flex;
                align-items: center;
                width: calc(100%);
                .select-name-span {
                    width: calc(100% - 20px);
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .default-name {
                background: rgba(58, 132, 255, 0.1);
                border-radius: 2px;
                color: #3A84FF;
                line-height: 16px;
                padding: 0 4px;
                flex-shrink: 0;
            }
            .item-select-default {
                display: none;
                color: #3A84FF;
                cursor: pointer;
                flex-shrink: 0;
            }
            &:hover {
                .item-select-name {
                    display: flex;
                    align-items: center;
                    width: calc(100% - 48px);
                }
                .item-select-show-all {
                    width: calc(100%);
                }
                .item-select-default {
                    display: block;
                }
            }
        }
    }
</style>
