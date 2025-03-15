/*
message MiscStateUpdateResponse {
  message PixelBucket {
    uint32 amount = 1;
    uint32 maxAmount = 2;
    float increasePerMinute = 3;
  }

  message Scores {
    PixelGuild guild = 1;
    uint32 amount = 2;
  }

  message PowerUps {
    uint32 powerUpId = 1;
    bool Directed = 2 [json_name = "Directed"];
    string name = 3;
    string description = 4;
  }

  message Notification {
    string message = 1;
  }

  PixelBucket pixelBucket = 1;
  repeated Scores scores = 2;
  repeated PowerUps powerUps = 3;
  Notification notification = 4;
  bool powerupUpdate = 5;
}
*/

export let miscState = $state<{
  pixelBucket: { amount: number; maxAmount: number; increasePerMinute: number }
  scores: { guild: number; amount: number }[]
  powerUps: { powerUpId: number; Directed: boolean; name: string; description: string }[]
  notification: string
  powerupUpdate: boolean
}>({
  pixelBucket: { amount: 0, maxAmount: 0, increasePerMinute: 0 },
  scores: [],
  powerUps: [],
  notification: '',
  powerupUpdate: false
})
