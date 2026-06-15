import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({
  length: 6,
  dictionary: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
});

export async function generateUniqueId(model: any): Promise<string> {
  while (true) {
    let id = uid.randomUUID();

    while (/^\d/.test(id)) {
      id = uid.randomUUID();
    }

    try {
      const exists = await model.findUnique({
        where: { id }
      });

      if (!exists) {
        return id;
      }
    } catch (error) {
      console.error('Error checking ID uniqueness:', error);
    }
  }
}
