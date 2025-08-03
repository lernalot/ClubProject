/**
 * This file is part of the club project.
 * @description 收敛所有的请求
 */

import shttp from '../httpRequest/shttp';

export const getClubInfo = async (clubId: string) => {
  try {
    return {
        code: 0,
        info: {
            list: [
                {
                    id: clubId,
                    name: "Example Club",
                    description: "This is an example club for demonstration purposes.",
                    members: 100,
                    created_at: "2023-01-01T00:00:00Z",
                    updated_at: "2023-01-02T00:00:00Z"
                },
                {
                    id: clubId,
                    name: "Example Club2",
                    description: "This is an example club for demonstration purposes.",
                    members: 100,
                    created_at: "2023-01-01T00:00:00Z",
                    updated_at: "2023-01-02T00:00:00Z"
                }
            ]
        }
    }
    // java 层
    // const mid = req?.headers.mid
    const response = await shttp.post(`/clubs/${clubId}`, {
      data: mid
    });
    return response;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
  }
}