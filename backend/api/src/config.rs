use dotenv;

pub struct Config {
    pub host: String,
    pub port: u16,
}

impl Config {
    pub fn new() -> Config {
        dotenv::dotenv().ok();

        let host = dotenv::var("HOST");
        let port = dotenv::var("BACKEND_PORT");
        
        
        match (host, port) {
            (Ok(h), Ok(p)) => {
                Config {
                    host: h,
                    port: p.parse::<u16>().unwrap(),
                }
            }
            (_, _) => {
                warn!("Environment variables not set. Setting to default of localhost:9000");
                Config {
                    host: "127.0.0.1".to_string(),
                    port: 9000,
                }
            }
        }
    }
}