import HomeRepository from "@/repositories/home/home.repository";

class HomeService {
    async getHomeData() {
        return HomeRepository.getHomeData();
    }
}

export default new HomeService();