import ClassReader from "../class-reader";
import { ConstantInfo } from "../constant-info";

/*
attribute_info {
    u2 attribute_name_index;
    u4 attribute_length;
    u1 info[attribute_length];
}
*/
export default abstract class AttributeInfo {}
