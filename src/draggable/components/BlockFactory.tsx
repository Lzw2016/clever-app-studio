import {defineComponent} from "vue";
import {BlockDesign} from "@/draggable/types/Block";

function createBlock(block: BlockDesign) {


    return defineComponent({
        // name: "",
        // props: {},
        data(vm) {

        },
        computed: {

        },
        watch: {},
        render() {
            return (
                <div>
                    !@#
                </div>
            )
        },
    });


    // return createVNode(
    //     "div",
    //     {},
    //     {
    //         default: () => {
    //             return [];
    //         }
    //     }
    // );
}

export {
    createBlock,
}



