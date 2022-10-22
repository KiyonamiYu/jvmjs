import ClassReader from "./class-reader";
import {
  ConstantDoubleInfo,
  ConstantInfo,
  ConstantLongInfo,
  readConstantInfo,
} from "./constant-info";
import { MemberInfo } from "./member-info";
import { AttributeInfo, readAttribute } from "./attribute-info";
import ConstantClassInfo from "./constant-info/constant-info-class";
import ConstantUtf8Info from "./constant-info/constant-info-utf8";

/*
ClassFile {
    u4             magic;
    u2             minor_version;
    u2             major_version;
    u2             constant_pool_count;
    cp_info        constant_pool[constant_pool_count-1];
    u2             access_flags;
    u2             this_class;
    u2             super_class;
    u2             interfaces_count;
    u2             interfaces[interfaces_count];
    u2             fields_count;
    field_info     fields[fields_count];
    u2             methods_count;
    method_info    methods[methods_count];
    u2             attributes_count;
    attribute_info attributes[attributes_count];
}
*/
export default class ClassFile {
  private constructor(
    private readonly minorVersion: number,
    private readonly majorVersion: number,
    public readonly constantPool: ConstantInfo[],
    private readonly accessFlags: number,
    private readonly thisClass: number,
    private readonly superClass: number,
    private readonly interfaces: number[],
    public readonly fields: MemberInfo[],
    public readonly methods: MemberInfo[],
    private readonly attributes: AttributeInfo[]
  ) {
    this.minorVersion = minorVersion;
    this.majorVersion = majorVersion;
    this.constantPool = constantPool;
    this.accessFlags = accessFlags;
    this.thisClass = thisClass;
    this.superClass = superClass;
    this.interfaces = interfaces;
    this.fields = fields;
    this.methods = methods;
    this.attributes = attributes;
  }

  public static read(bytecode: ArrayBuffer): ClassFile {
    const classReader = new ClassReader(bytecode);

    const magic = classReader.readUint32();
    ClassFile.checkMagic(magic);
    const minorVersion = classReader.readUint16();
    const majorVersion = classReader.readUint16();
    ClassFile.checkVersion(minorVersion, majorVersion);
    const constantPool = ClassFile.readConstantPool(classReader);
    const accessFlags = classReader.readUint16();
    const thisClass = classReader.readUint16();
    const superClass = classReader.readUint16();
    const interfaces = classReader.readUint16s();
    const fields = ClassFile.readMembers(classReader, constantPool);
    const methods = ClassFile.readMembers(classReader, constantPool);
    const attributes = ClassFile.readAttributes(classReader, constantPool);

    return new ClassFile(
      minorVersion,
      majorVersion,
      constantPool,
      accessFlags,
      thisClass,
      superClass,
      interfaces,
      fields,
      methods,
      attributes
    );
  }

  private static checkMagic(magic: number): void {
    if (magic != 0xcafebabe) {
      throw new Error("java.lang.ClassFormatError: magic!");
    }
  }

  private static checkVersion(minorVersion: number, majorVersion: number): void {
    if (majorVersion === 45) {
      return;
    }
    if ([46, 47, 48, 49, 50, 51, 52].includes(majorVersion) && minorVersion === 0) {
      return;
    }
    throw new Error("java.lang.UnsupportedClassVersionError!");
  }

  private static readConstantPool(classReader: ClassReader): ConstantInfo[] {
    const constantCount = classReader.readUint16();
    const constantPool = new Array<ConstantInfo>(constantCount);

    for (let i = 1; i < constantCount; i += 1) {
      constantPool[i] = readConstantInfo(classReader);
      // http://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.4.5
      // All 8-byte constants take up two entries in the constant_pool table of the class file.
      // If a CONSTANT_Long_info or CONSTANT_Double_info structure is the item in the constant_pool
      // table at index n, then the next usable item in the pool is located at index n+2.
      // The constant_pool index n+1 must be valid but is considered unusable.
      // switch cp[i].(type) {
      //   case *ConstantLongInfo, *ConstantDoubleInfo:
      //     i++
      // }
      if (
        constantPool[i] instanceof ConstantLongInfo ||
        constantPool[i] instanceof ConstantDoubleInfo
      ) {
        i += 1;
      }
    }
    return constantPool;
  }

  private static readMembers(classReader: ClassReader, constantPool: ConstantInfo[]) {
    const memberCount = classReader.readUint16();
    const members = new Array<MemberInfo>(memberCount);
    for (let i = 0; i < memberCount; i += 1) {
      members[i] = MemberInfo.read(classReader, constantPool);
    }
    return members;
  }

  private static readAttributes(classReader: ClassReader, constantPool: ConstantInfo[]) {
    const attributeCount = classReader.readUint16();
    const attributes = new Array<AttributeInfo>(attributeCount); // TODO
    for (let i = 0; i < attributeCount; i += 1) {
      attributes[i] = readAttribute(classReader, constantPool);
    }
    return attributes;
  }

  public classVersion() {
    return `${this.majorVersion}.${this.minorVersion}`;
  }

  public classname() {
    return this.getClassnameFromConstantPool(this.thisClass);
  }

  public superClassname() {
    return this.getClassnameFromConstantPool(this.superClass);
  }

  public interfaceNames() {
    return this.interfaces.map((interfaceIndex: number) =>
      this.getClassnameFromConstantPool(interfaceIndex)
    );
  }

  private getClassnameFromConstantPool(classIndex: number) {
    const constantClassInfo = this.constantPool[classIndex] as ConstantClassInfo;
    const constantUtf8Info = this.constantPool[constantClassInfo.nameIndex] as ConstantUtf8Info;
    return constantUtf8Info.str;
  }
}
