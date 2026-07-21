import { homeMock } from "@/mocks/home/home.mock";

class HomeRepository {
    async getHomeData() {
        return Promise.resolve(homeMock);
    }
}

export default new HomeRepository();