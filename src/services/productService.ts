import { AxiosError } from "axios";
import { axiosInstance } from "../axiosInstance";
import { CreateProductDto } from "../dtos/createProductDto";
import { UpdateProductDto } from "../dtos/updateProductDto";
import { ProductEntity } from "../entities/ProductEntity";
import { ProductListEntity } from "../entities/ProductListEntity";
import { CustomError } from "../handler/CustomError";
import { strings } from "../utils/strings";

export const productService = {
  findAllPaginate: async (
    virtualPage: number,
    pageLimit: number
  ): Promise<ProductListEntity> => {
    return await axiosInstance
      .get<ProductListEntity>(`?skip=${virtualPage}&limit=${pageLimit}`)
      .then((response) => response.data)
      .catch(genericCatch);
  },
  findById: async (id: number): Promise<ProductEntity> => {
    return await axiosInstance
      .get<ProductEntity>(`${id}`)
      .then((response) => response.data)
      .catch(genericCatch);
  },
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${id}`).catch(genericCatch);
  },
  create: async (dto: CreateProductDto): Promise<void> => {
    await axiosInstance.post("add", dto).catch(genericCatch);
  },
  update: async (id: number, dto: UpdateProductDto): Promise<ProductEntity> => {
    return await axiosInstance
      .put<ProductEntity>(`${id}`, dto)
      .then((response) => response.data)
      .catch(genericCatch);
  },
};

const genericCatch = (error: AxiosError) => {
  const { response } = error;

  if (!response) {
    throw new CustomError(strings.unexpectedError);
  }

  throw new CustomError(response.data.message ?? strings.unexpectedError);
};
