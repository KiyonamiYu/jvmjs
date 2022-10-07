import { CompositeEntry, DirEntry, WildcardEntry, ZipEntry } from "../../src/classpath";
import Classpath from "../../src/classpath/classpath";

describe("entry", () => {
  test("DirEntry", async () => {
    const buffer = await new DirEntry("../../test/resource/contract-auction").readClass(
      "bean/InvokeBean.class"
    );
    expect(buffer.byteLength).toBe(1272);
  });

  test("ZipEntry", async () => {
    const buffer0 = await new DirEntry("../../test/resource/contract-auction").readClass(
      "bean/InvokeBean.class"
    );

    const zipEntry = new ZipEntry("../../test/resource/contract-auction.jar");
    const buffer = await zipEntry.readClass("bean/InvokeBean.class");

    expect(buffer.byteLength).toBe(1272);
    expect(buffer).toStrictEqual(buffer0);
  });

  test("WildcardEntry", async () => {
    const zipEntry = new ZipEntry("../../test/resource/contract-auction.jar");
    const buffer0 = await zipEntry.readClass("bean/InvokeBean.class");

    const wildcardEntry = new WildcardEntry("../../test/resource/*");
    const buffer = await wildcardEntry.readClass("bean/InvokeBean.class");

    expect(buffer.byteLength).toBe(1272);
    expect(buffer).toStrictEqual(buffer0);
  });

  test("CompositeEntry", async () => {
    const wildcardEntry = new WildcardEntry("../../test/resource/*");
    const buffer0 = await wildcardEntry.readClass("bean/InvokeBean.class");

    const compositeEntry = new CompositeEntry(
      "../../test/resource/*:../../test/resource/contract-auction.jar"
    );
    const buffer = await compositeEntry.readClass("bean/InvokeBean.class");

    expect(buffer.byteLength).toBe(1272);
    expect(buffer).toStrictEqual(buffer0);
  });
});

describe("classpath", () => {
  test("read class named 'bean/InvokeBean'", async () => {
    const wildcardEntry = new WildcardEntry("../../test/resource/*");
    const buffer0 = await wildcardEntry.readClass("bean/InvokeBean.class");

    const classpath = Classpath.parse(
      undefined,
      "../../test/resource/*:../../test/resource/contract-auction.jar"
    );
    const buffer = await classpath.readClass("bean/InvokeBean");

    expect(buffer.byteLength).toBe(1272);
    expect(buffer).toStrictEqual(buffer0);
  });

  test("read class named 'java/lang/Object'", async () => {
    const classpath = Classpath.parse(
      undefined,
      "../../test/resource/*:../../test/resource/contract-auction.jar"
    );
    const buffer = await classpath.readClass("java/lang/Object");

    // expect(buffer.byteLength).toBe(1272);
    expect(buffer).not.toBeNull();
  });
});
