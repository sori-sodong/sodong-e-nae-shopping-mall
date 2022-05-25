import { productModel } from '../db';

class ProductService {
  // 본 파일의 맨 아래에서, new ProductService(productModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 제품 등록(판매자만 가능)
  async addProduct(productInfo) {
    // 객체 destructuring
    const { name, price, description, company } = productInfo;

    // 제품명 중복 확인
    const product = await this.productModel.findByName(name);
    if (product) {
      throw new Error(
        '이 제품명은 현재 사용중입니다. 다른 제품명을 입력해 주세요.',
      );
    }

    const newProductInfo = { name, price, description, company };

    // db에 저장
    const createdNewProduct = await this.productModel.create(newProductInfo);

    return createdNewProduct;
  }

  // 제품 목록을 받음.
  async getProducts() {
    const products = await this.productModel.findAll();
    return products;
  }

  // 매개변수인 category가 존재하면 category에 해당하는 제품 목록을 받음.

  // id에 해당하는 제품을 받음.
  async getProductById(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  // 제품정보 수정(판매자만 가능)
  async setProduct(productId, toUpdate) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('해당하는 제품이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 업데이트 진행
    product = await this.productModel.update({
      productId,
      update: toUpdate,
    });

    return product;
  }

  //제품 삭제(판매자만 가능)
  // async deleteProduct(productId) {
  //   const product = await this.productModel.delete(productId);
  //   return product;
  // }
}

const productService = new ProductService(productModel);

export { productService };