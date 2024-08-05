import bcrypt from "bcrypt";

export const encryptHelper = async (data: string): Promise<string> => {

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data, salt);
    return hash;

};

export const comparePasswordHelper = async (data: string, hash: string) => {

    return await bcrypt.compare(data, hash);
}
