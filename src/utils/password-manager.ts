import * as bcrypt from 'bcrypt'

export class PasswordManager {
  constructor() {}

  async generatePasswordHash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
    } catch (error) {
      throw error
    }
  }

  async validatePassword(password: string, hash: string): Promise<string> {
    return await bcrypt.compare(password, hash)
  }
}