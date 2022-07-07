<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">

* {-webkit-tap-highlight-color:rgba(0,0,0,0)}
html, body, input, textarea, keygen, select, button{
  font-family: 'Microsoft YaHei', sans-serif;
}

body{
  height: 100%;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


/** pagination **/
.el-pagination {
  white-space: normal;
}
.el-pagination.is-background {
  font-weight: normal;
}
.el-pagination.is-background li.active {
  font-weight: 700;
}

.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  border-radius: 6px;
}

.el-pagination.is-background .btn-next + .el-pagination__total{
  margin-left: 10px;
}

.el-pagination.is-background .el-pagination__total + .el-pagination__jump{
  margin-left: 0;
}

.el-pagination.is-background .el-pagination__jump + .el-pagination__sizes {
  margin-left: 5px; 
}

.el-pagination .el-select .el-input{
  width: 80px;
}

.el-pagination .el-select .el-input .el-input__inner{
  padding-left: 5px;
  padding-right: 18px;
}

/** select, cascader, date **/
.el-select, .el-cascader{
  width: 100%;
}

.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}


/** table **/
.el-table--small td{
  padding-top: 7px;
  padding-bottom: 7px;
}

/** message-box **/
.el-message-box{
  border: 0;
  border-radius: 5px;
}

.el-message-box__header{
  padding-top: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.el-message-box__headerbtn{
  top: 10px;
}


/** tree **/
.el-tree-node__content{
  display: table;
  width: 100%;
  height: 30px;
  padding-right: 5px;

  .el-button{
    transition: none;
  }

  & > .el-checkbox:last-of-type{
    float: left;
    margin-top: 5px;
    margin-right: 8px;
  }
}

.el-tree-node__label{
  line-height: 30px;
}

.el-tree-node__expand-icon{
  float: left;
  font-size: 16px;
}

.el-tree-node__loading-icon{
  float: left;
  margin-top: 8px;
}

/** 左侧布局col固定  card高度填充  **/
.main-view {
  .aside-col-wrap{
    height: calc(~"100vh - 215px")
  }

  .el-tree-node > .el-tree-node__children{
    overflow: visible;
  }
}

.el-aside-col{
  position: fixed;
  bottom: 0;
  top: 0;
  width: calc(~"25% - 11px");

  &.el-aside-col--collapse{
    width: calc(~"25% - 17px");
    max-width: inherit;
  }

}

.el-aside-col + .el-col{
  margin-left: calc(~"25% + 2px");
}

.main-view .el-aside-col{
  position: fixed;
  top: 138px;
  bottom: 0;
  width: 22%;
  max-width: calc(~"25% - 54px");

  &.el-aside-col--collapse{
    width: calc(~"25% - 17px");
    max-width: inherit;
  }

  .el-tree-node > .el-tree-node__children{
    overflow: visible;
  }
}


/** fullscreen  **/
.main--fullscreen{
  .el-aside-col{
    top: 44px;
    width: 25%;
    max-width:  inherit;
    &.el-aside-col--collapse{
      width: 25%;
    }
  }
  
  .aside-col-wrap{
    height: calc(~"100vh - 121px");
  }

  .item--fullscreen{
    z-index: 223;
  }
}

.item--fullscreen{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 10px;
  right: 10px;
  z-index: 222;
  background: #fff;
}


/** tree slot **/
.custom-tree-node{
  display: table;
  width: calc(~"100% - 28px");
  margin-left: 28px;

  & > span{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .el-button{
      margin-left: 5px;
      padding: 7px 0;
      vertical-align: top;
    }

  }

}

.el-tree-node__expand-icon + .el-checkbox + .custom-tree-node,
.el-tree-node__expand-icon + .el-icon-loading + .custom-tree-node{
  width: calc(~"100% - 50px");
  margin-left: 50px;
}

.el-tree-node__expand-icon + .el-checkbox + .el-icon-loading + .custom-tree-node{
  width: calc(~"100% - 72px");
  margin-left: 72px;
}

.el-tree-node__content > .el-tree-node__label{
  display: block;
  width: calc(~"100% - 28px");
  margin-left: 28px;
}

.el-tree-node__expand-icon + .el-checkbox + .el-tree-node__label,
.el-tree-node__expand-icon + .el-icon-loading + .el-tree-node__label{
  width: calc(~"100% - 50px");
  margin-left: 50px;
}


.el-tree-node__expand-icon + .el-checkbox + .el-icon-loading + .el-tree-node__label{
  width: calc(~"100% - 72px");
  margin-left: 72px;
}

/**  card **/
.el-card__header{
  padding: 9px 20px;
}

/** tabs **/
.el-tabs__nav{
  margin-top: 0px;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item{
  color: #303133;
}
.el-tabs{
  border-radius: 4px;
  overflow: hidden;
}


/** input prepend append **/
.el-input-group__prepend .el-select, .el-input-group__append .el-select{
  width: 130px;
}

.el-input-group__prepend .el-input--small .el-input__inner, .el-input-group__append .el-input--small .el-input__inner{
  height: 30px;
  line-height: 30px;
}

/** input disabled **/
.el-input.is-disabled .el-input__inner{
  color:#9d99a2;
}

@media all and (-ms-high-contrast: none),(-ms-high-contrast: active) {
  .el-table--fit .el-table__body, .el-table--fit .el-table__header, .el-table--fit .el-table__footer{
    width: 100% !important;
  } 
}

</style>
