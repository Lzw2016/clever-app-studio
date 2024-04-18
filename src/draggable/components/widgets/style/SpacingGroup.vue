<script setup lang="ts">

// 定义组件选项
defineOptions({
    name: 'SpacingGroup',
});


</script>

<template>
    <div>
        <div class="spacing-wrap">
            <div class="spacing-max-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="224" height="120" style="grid-area: 1 / 1 / -1 / -1">
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="m1,1 h223 l-36,24 h-151 l-36,-24z"
                                data-automation-id="margin-top-button"
                                aria-label="Margin top button"
                                class="tb-path-color"
                            ></path>
                            <!--                                @click="clickMargin(SPACING_PROPERTY.MarginTop, $event)"-->
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="
              m223,1
              v119
              l-36,-24
              v-71
              l36,-24z
            "
                                data-automation-id="margin-right-button"
                                aria-label="Margin right button"
                                class="lr-path-color"
                                @click="clickMargin(SPACING_PROPERTY.MarginRight, $event)"
                            ></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="
              m1,119
              h223
              l-36,-24
              h-151
              l-36,24z
            "
                                data-automation-id="margin-bottom-button"
                                aria-label="Margin bottom button"
                                class="tb-path-color"
                                @click="clickMargin(SPACING_PROPERTY.MarginBottom, $event)"
                            ></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="
              m1,1
              v119
              l36,-24
              v-71
              l-36,-24z
            "
                                data-automation-id="margin-left-button"
                                aria-label="Margin left button"
                                class="lr-path-color"
                                @click="clickMargin(SPACING_PROPERTY.MarginLeft, $event)"
                            ></path>
                        </g>
                    </g>
                    <clipPath id="margin-outer">
                        <rect
                            x="0"
                            y="0"
                            width="224"
                            height="120"
                            fill="transparent"
                            rx="2"
                            ry="2"
                            style="pointer-events: none"
                        ></rect>
                    </clipPath>
                    <rect
                        class="stroke"
                        clip-path="url(#margin-outer)"
                        x="0"
                        y="0"
                        width="224"
                        height="120"
                        fill="transparent"
                        rx="2"
                        ry="2"
                        style="pointer-events: none; stroke-width: 2px"
                    ></rect>
                    <clipPath id="margin-inner">
                        <rect
                            x="36"
                            y="24"
                            width="152"
                            height="72"
                            fill="transparent"
                            rx="2"
                            ry="2"
                            style="pointer-events: none"
                        ></rect>
                    </clipPath>
                    <rect
                        class="stroke"
                        clip-path="url(#margin-inner)"
                        x="36"
                        y="24"
                        width="152"
                        height="72"
                        fill="transparent"
                        rx="2"
                        ry="2"
                        style="pointer-events: none; stroke-width: 2px"
                    ></rect>
                </svg>
                <div
                    :class="[
          'spacing-edit',
          'margin-top',
          {
            // 'is-setting': getSettingFlag(SPACING_PROPERTY.MarginTop),
            // 'is-show': state.show && state.className === SPACING_PROPERTY.MarginTop
          }
        ]"
                >
                    <!--                    @click="clickMargin(SPACING_PROPERTY.MarginTop, $event)"-->
                    <!--                    {{ getPropertyText(SPACING_PROPERTY.MarginTop) }}-->
                </div>
                <div
                    :class="[
          'spacing-edit',
          'margin-right',
          {
            // 'is-setting': getSettingFlag(SPACING_PROPERTY.MarginRight),
            // 'is-show': state.show && state.className === SPACING_PROPERTY.MarginRight
          }
        ]"
                >
                    <!--                    @click="clickMargin(SPACING_PROPERTY.MarginRight, $event)"-->
                    <!--                    {{ getPropertyText(SPACING_PROPERTY.MarginRight) }}-->
                </div>
                <div
                    :class="[
          'spacing-edit',
          'margin-bottom',
          {
            // 'is-setting': getSettingFlag(SPACING_PROPERTY.MarginBottom),
            // 'is-show': state.show && state.className === SPACING_PROPERTY.MarginBottom
          }
        ]"
                >
                    <!--                    @click="clickMargin(SPACING_PROPERTY.MarginBottom, $event)"-->
                    <!--                    {{ getPropertyText(SPACING_PROPERTY.MarginBottom) }}-->
                </div>
                <div
                    :class="[
          'spacing-edit',
          'margin-left',
          {
            // 'is-setting': getSettingFlag(SPACING_PROPERTY.MarginLeft),
            // 'is-show': state.show && state.className === SPACING_PROPERTY.MarginLeft
          }
        ]"
                >
                    <!--                    @click="clickMargin(SPACING_PROPERTY.MarginLeft, $event)"-->
                    <!--                    {{ getPropertyText(SPACING_PROPERTY.MarginLeft) }}-->
                </div>
            </div>
            <div class="spacing-min-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="144" height="64" style="grid-area: 1 / 1 / -1 / -1">
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="
              m1,1
              h143
              l-36,24
              h-71
              l-36,-24z
            "
                                data-automation-id="padding-top-button"
                                aria-label="Padding top button"
                                class="tb-path-color"
                            ></path>
                            <!--                                @click="clickPadding(SPACING_PROPERTY.PaddingTop, $event)"-->
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="
              m143,1
              v63
              l-36,-24
              v-15
              l36,-24z
            "
                                data-automation-id="padding-right-button"
                                aria-label="Padding right button"
                                class="lr-path-color"
                            ></path>
                            <!--                                @click="clickPadding(SPACING_PROPERTY.PaddingRight, $event)"-->
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="
              m1,63
              h143
              l-36,-24
              h-71
              l-36,24z
            "
                                data-automation-id="padding-bottom-button"
                                aria-label="Padding bottom button"
                                class="tb-path-color"
                            ></path>
                            <!--                                @click="clickPadding(SPACING_PROPERTY.PaddingBottom, $event)"-->
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="
              m1,1
              v63
              l36,-24
              v-15
              l-36,-24z
            "
                                data-automation-id="padding-left-button"
                                aria-label="Padding left button"
                                class="lr-path-color"
                            ></path>
                            <!--                                @click="clickPadding(SPACING_PROPERTY.PaddingLeft, $event)"-->
                        </g>
                    </g>
                    <clipPath id="padding-outer">
                        <rect
                            x="0"
                            y="0"
                            width="144"
                            height="64"
                            fill="transparent"
                            rx="2"
                            ry="2"
                            style="pointer-events: none"
                        ></rect>
                    </clipPath>
                    <rect
                        class="stroke"
                        clip-path="url(#padding-outer)"
                        x="0"
                        y="0"
                        width="144"
                        height="64"
                        fill="transparent"
                        rx="2"
                        ry="2"
                        style="pointer-events: none; stroke-width: 2px"
                    ></rect>
                    <clipPath id="padding-inner">
                        <rect
                            x="36"
                            y="24"
                            width="72"
                            height="16"
                            fill="transparent"
                            rx="2"
                            ry="2"
                            style="pointer-events: none"
                        ></rect>
                    </clipPath>
                    <rect
                        class="stroke"
                        clip-path="url(#padding-inner)"
                        x="36"
                        y="24"
                        width="72"
                        height="16"
                        fill="transparent"
                        rx="2"
                        ry="2"
                        style="pointer-events: none; stroke-width: 2px"
                    ></rect>
                </svg>
                <div
                    :class="[
          'spacing-edit',
          'padding-top',
          {
            // 'is-setting': getSettingFlag(SPACING_PROPERTY.PaddingTop),
            // 'is-show': state.show && state.className === SPACING_PROPERTY.PaddingTop
          }
        ]"
                >
                    <!--                    @click="clickPadding(SPACING_PROPERTY.PaddingTop, $event)"-->
                    <!--                    {{ getPropertyText(SPACING_PROPERTY.PaddingTop) }}-->
                </div>
                <div
                    :class="[
          'spacing-edit',
          'padding-right',
          {
            // 'is-setting': getSettingFlag(SPACING_PROPERTY.PaddingRight),
            // 'is-show': state.show && state.className === SPACING_PROPERTY.PaddingRight
          }
        ]"
                >
                    <!--                    @click="clickPadding(SPACING_PROPERTY.PaddingRight, $event)"-->
                    <!--                    {{ getPropertyText(SPACING_PROPERTY.PaddingRight) }}-->
                </div>
                <div
                    :class="[
          'spacing-edit',
          'padding-bottom',
          {
            // 'is-setting': getSettingFlag(SPACING_PROPERTY.PaddingBottom),
            // 'is-show': state.show && state.className === SPACING_PROPERTY.PaddingBottom
          }
        ]"
                >
                    <!--                    @click="clickPadding(SPACING_PROPERTY.PaddingBottom, $event)"-->
                    <!--                    {{ getPropertyText(SPACING_PROPERTY.PaddingBottom) }}-->
                </div>
                <div
                    :class="[
          'spacing-edit',
          'padding-left',
          {
            // 'is-setting': getSettingFlag(SPACING_PROPERTY.PaddingLeft),
            // 'is-show': state.show && state.className === SPACING_PROPERTY.PaddingLeft
          }
        ]"
                >
                    <!--                    @click="clickPadding(SPACING_PROPERTY.PaddingLeft, $event)"-->
                    <!--                    {{ getPropertyText(SPACING_PROPERTY.PaddingLeft) }}-->
                </div>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                style="grid-area: 3 / 3 / span 3 / span 3; pointer-events: none"
            >
                <text x="6" y="4" fill="#a6a6a6" font-style="italic" font-weight="bold" font-size="8" dominant-baseline="hanging">
                    padding
                </text>
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                style="grid-area: 1 / 1 / -1 / -1; pointer-events: none"
            >
                <text x="6" y="4" fill="#a6a6a6" font-style="italic" font-weight="bold" font-size="8" dominant-baseline="hanging">
                    margin
                </text>
            </svg>
        </div>
    </div>
</template>

<style scoped>
.spacing-wrap {
    position: relative;
    display: grid;
    grid-template-columns: 36px 4px 36px 1fr 36px 4px 36px;
    grid-template-rows: 24px 4px 24px 1fr 24px 4px 24px;
    width: 224px;
    height: 120px;
    margin: 0 auto;
    outline-style: none;
    cursor: default;
    user-select: none;
}

.spacing-wrap .spacing-max-icon {
    grid-area: 1 / 1 / -1 / -1;
    display: grid;
    grid-template-columns: 36px 1fr 36px;
    grid-template-rows: 24px minmax(16px, 1fr) 24px;
    justify-items: center;
    width: 224px;
    height: 120px;
}

.spacing-wrap .spacing-min-icon {
    grid-area: 3 / 3 / span 3 / span 3;
    display: grid;
    grid-template-columns: 36px 1fr 36px;
    grid-template-rows: 24px minmax(16px, 1fr) 24px;
    justify-items: center;
    width: 144px;
    height: 64px;
}

.spacing-wrap .spacing-edit {
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    'Helvetica Neue', Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: -0.2px;
    display: flex;
    color: #191919;
    background: transparent;
    padding: 2px 4px;
    margin-left: -2px;
    border-radius: 2px;
    max-width: 100%;
    box-sizing: content-box;
    place-self: center;
    position: relative;
    opacity: 1;
    align-items: center;
    justify-content: center;
}

.spacing-wrap .spacing-edit.is-setting {
    background-color: rgba(76, 152, 241, 0.15);
}

.spacing-wrap .spacing-edit.is-show {
    background-color: #6b6b6b;
}

.spacing-wrap .spacing-edit.margin-top, .spacing-wrap .spacing-edit.padding-top {
    grid-area: 1 / 2 / 2 / 3;
}

.spacing-wrap .spacing-edit.margin-right, .spacing-wrap .spacing-edit.padding-right {
    grid-area: 2 / 3 / 3 / 4;
}

.spacing-wrap .spacing-edit.margin-bottom, .spacing-wrap .spacing-edit.padding-bottom {
    grid-area: 3 / 2 / 4 / 3;
}

.spacing-wrap .spacing-edit.margin-left,
.spacing-wrap .spacing-edit.padding-left {
    grid-area: 2 / 1 / 3 / 2;
}

.spacing-wrap .lr-path-color {
    cursor: pointer;
    color: #e5e5e5;
}

.spacing-wrap .lr-path-color:hover {
    color: #dfdfdf;
}

.spacing-wrap .tb-path-color {
    cursor: pointer;
    color: #d1d1d1;
}

.spacing-wrap .tb-path-color:hover {
    color: #bdbdbd;
}

.spacing-wrap .stroke {
    stroke: #999;
}
</style>
